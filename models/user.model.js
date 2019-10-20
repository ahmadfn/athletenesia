var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    firstName: {
        type:String, 
        required:[true, "firstName is required!"],
        trim: true
    },
    lastName: {
        type:String,
        trim: true,
        default: undefined
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

  var User = mongoose.model('User', userSchema);

  module.exports = User