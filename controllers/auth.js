const Joi = require('joi');
const {User} = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');


async function createAuth (req, res) {     
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).send('Invalide email or password');

    const validPassword = await bcrypt.compare(req.body.Password, user.Password);
    if(!validPassword) return res.status(400).send('Invalide email or password');

    const token = user.generateAuthToken();

    res.send(token);
}

function validate(req) {
    const schema = {
        Password: Joi.string().min(3).max(255).required(),
        Email: Joi.string().min(3).max(255).required().email(),        
    };
  
    return Joi.validate(req, schema);
  }


exports.createAuth = createAuth;

 