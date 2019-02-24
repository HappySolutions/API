const Joi = require('Joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:50
      },
      Password: {
        type: String,
        required:true,
        minlength: 3,
        maxlength: 255
      },
      Email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:255,
        unique: true  
    }
}));
  
  function validateUser(user) {
    const schema = {
        Name: Joi.string().min(3).max(50).required(),
        Password: Joi.string().min(3).max(255).required(),
        Email: Joi.string().min(3).max(255).required().email(),        
    };
  
    return Joi.validate(user, schema);
  }
  
  exports.User = User; 
  exports.validate = validateUser;