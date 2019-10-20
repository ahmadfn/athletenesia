const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const adminSchema = new mongoose.Schema({
  userName: {
    type:String, 
    required:[true, "userName is required!"],
    minlength: [5, "userName minimum length is 5 characters"],
  },
  password: {
    type:String, 
    required:[true, "Password is required!"],
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin