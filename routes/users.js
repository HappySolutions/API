const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/users');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//============================
router.post('/', async (req , res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ Email: req.body.Email});
    if (user) return res.status(404).send('User already registered');

    
    //create the new User
    user = new User(_.pick(req.body, ['Name', 'Email', 'Password']));

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(req.body.Password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'Name', 'Email']));
});

module.exports = router;