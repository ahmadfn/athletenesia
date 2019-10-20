const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  skill: {
    type:String, 
    required:[true, "skill is required!"],
    minlength: [4, "skill minimum length is 4 characters"],
    maxlength: [20, "skill maximum length is 20 characters"]
	}
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill