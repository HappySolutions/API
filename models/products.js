const Joi = require('Joi');
const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
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
    Pro_Price: Number,
    Pro_IMG: {
        type: String,
        minlength: 5,
        maxlength: 50
      }
  }));
  
  function validateProduct(product) {
    const schema = {
      Pro_Name: Joi.string().min(3).required(),
      Pro_Category: Joi.string(),
      Pro_Description: Joi.string(),
      Pro_Price: Joi.number(),
      Pro_IMG: Joi.string()

    };
  
    return Joi.validate(product, schema);
  }
  
  exports.Product = Product; 
  exports.validate = validateProduct;