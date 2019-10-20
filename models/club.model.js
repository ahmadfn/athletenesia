const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const clubSchema = new mongoose.Schema({
    clubName: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    sportId: {
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
    }]
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;