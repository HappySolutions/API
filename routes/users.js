const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/users');
const mongoose = require('mongoose');
const _ = require('lodash');




//============================
router.post('/', async (req , res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(404).send('User already registered');

    
    //create the new User
    user = new User(_.pick(req.body, ['Name', 'Email', 'Password']));

    await user.save();
    res.send(    _.pick(user, ['_id', 'Name', 'Email']));
});
//===========================================

router.put('/:id', async (req, res) => {
//validate the Order
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Order
    const UpdateUser = await User.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email
        }, {
        new: true
      });

    //return the updated product
    res.send(UpdateUser);
    
});
//===============================================

router.delete('/:id', async (req, res) => {
    //find the Product
    const DeletedUser = await User.findByIdAndRemove(req.params.id);

    if(!DeletedUser) return res.status(404).send('genre is not found');

    res.send(DeletedUser);

});

module.exports = router;