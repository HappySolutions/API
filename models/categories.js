const Joi = require('Joi');
const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
})
const Category = mongoose.model('Category', CategorySchema);
  
  function validateCategory(category) {
    const schema = {
        CategoryName: Joi.string().min(3).required()};
  
    return Joi.validate(category, schema);
  }
  
  exports.Category = Category; 
  exports.CategorySchema = CategorySchema;
  exports.validate = validateCategory;