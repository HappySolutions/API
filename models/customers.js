const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

customerSchema = new mongoose.Schema({
  UserName: {
      type: String
    },
    Password: {
      type: String
    },
    Email: {
      type: String
    },
    Phone: {
      type: String
    },
    Address: {
      type: String
    }
    });

const Customer = mongoose.model('Customer', customerSchema);

      customerSchema.methods.generateAuthToken = function(){
        const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
        return token
      }
  
  function validateCustomer(customer) {
    const schema = {
        UserName: Joi.string().min(3).required(),
        Password: Joi.string(),
        Email: Joi.string(),
        Phone: Joi.number(),
        Address: Joi.number()  
    };
  
    return Joi.validate(customer, schema);
  }
  
  exports.Customer = Customer; 
  exports.validate = validateCustomer;