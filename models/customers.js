const Joi = require('Joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
      }));
  
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