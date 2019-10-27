const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type:String, 
    required:[true, "email is required!"],
    trim: true
  },
  password: {
    type:String,
    required:[true, "Password is required!"]
  } 
});

const User = mongoose.model('User', userSchema);

module.exports = User