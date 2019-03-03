const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    Address: {
        type: String,
        minlength: 3,
        maxlength: 50
      },
    City: {
        type: String,
        minlength: 3,
        maxlength: 50
      },
    Phone: String,
    Payment: String,
    OrderPrice: String
  }));
  
  function validateOrder(order) {
    const schema = {
      Name: Joi.string().min(3).required(),
      Address: Joi.string(),
      City: Joi.string(),
      Phone: Joi.string(),
      Payment: Joi.string(),
      OrderPrice: Joi.string()
    };
  
    return Joi.validate(order, schema);
  }
  
  exports.Order = Order; 
  exports.validate = validateOrder;