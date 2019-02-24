const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customers');
const mongoose = require('mongoose');



router.get('/',async (req, res) =>{
    const customers = await Customer.find();
    res.send(customers);
});

//============================
router.get('/:id',async (req, res) =>{
    const customers = await Customer.findById(req.params.id);

    if(!customers) return res.status(404).send('Product with given ID is not found');
    
    res.send(customers);
});

//============================
router.post('/', async (req , res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    //create the new Product
    let newCustomer = new Customer({ 
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Address: req.body.Address,
    });

    newCustomer = await newCustomer.save();
     
    res.send(newCustomer);
});
//===========================================

router.put('/:id', async (req, res) => {
//validate the Order
const {error} = validate(req.body);
if (error) return res.status(404).send(error.details[0].message);

    //update the Order
    const UpdateCustomer = await Customer.findByIdAndUpdate(req.params.id, {
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Address: req.body.Address,
        }, {
        new: true
      });

    //return the updated product
    res.send(UpdateCustomer);
    
});
//===============================================

router.delete('/:id', async (req, res) => {
    //find the Product
    const DeletedCustomer = await Customer.findByIdAndRemove(req.params.id);

    if(!DeletedCustomer) return res.status(404).send('genre is not found');

    res.send(DeletedCustomer);

});

module.exports = router;