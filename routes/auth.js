const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {User} = require('../models/users');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//============================

router.post('/', async (req , res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ Email: req.body.Email });
    if (!user) return res.status(404).send('Invalide email or password');

    const validPassword = await bcrypt.compare(req.body.Password, user.Password);
    if(!validPassword) return res.status(404).send('Invalide email or password');

    // const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));
    const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey');

    res.send(token);
});
//===========================================

function validate(req) {
    const schema = {
        Password: Joi.string().min(3).max(255).required(),
        Email: Joi.string().min(3).max(255).required().email(),        
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;