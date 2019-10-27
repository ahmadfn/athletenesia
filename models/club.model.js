const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const clubSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  sport: {
    type: ObjectId,
    ref: 'Sport'
  },
  clubLogo: String,
  clubAddress: {
    type: String,
    trim: true
  },
  clubPhone: {
    type: String,
    trim: true
  },
  // a club can have different email for sign up purpose and as email contact
  clubEmail : {
    type: String
  },
  clubAbout: {
    type: String,
  },
  scholarshipOffered: [{
    type: ObjectId,
    ref: 'Scholarship'
  }],
  appliedAthlete: [{
    type: ObjectId,
    ref: 'Athlete'
  }]
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;