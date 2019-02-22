const Joi = require('Joi');
const mongoose = require('mongoose');

const CartOrder = mongoose.model('CartOrder', new mongoose.Schema({
    Pro_Name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
    Pro_Category: {
        type: String,
        minlength: 3,
        maxlength: 50
      },
    Pro_Description: {
        type: String,
        minlength: 5,
        maxlength: 50
      },
    Pro_Price: {
        type: Number,
        required: true
    },
    SelectedQuantity: {
        type: Number,
        required: true
    },
    SumPrice: {
        type: Number,
        required: true
    },
    Pro_IMG: {
        type: String,
        minlength: 5,
        maxlength: 50
      }
  }));
  
  function validateCartOrder(cartOrder) {
    const schema = {
        Pro_Name: Joi.string().min(3).required(),
        Pro_Category: Joi.string(),
        Pro_Description: Joi.string(),
        Pro_Price: Joi.number(),
        SelectedQuantity: Joi.number(),
        SumPrice: Joi.number(),
        Pro_IMG: Joi.string()
  
    };
  
    return Joi.validate(cartOrder, schema);
  }
  
  exports.CartOrder = CartOrder; 
  exports.validate = validateCartOrder;