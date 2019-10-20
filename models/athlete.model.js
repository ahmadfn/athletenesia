const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const athleteSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		ref: 'User'
	},
	sportId: {
		type: ObjectId,
		ref: 'Sport'
	},
	status: {
		type: String,
		default: 'calon atlet',
		trim: true
	},
	bornDate: {
		type: Date,
		min: '1990-01-01',
		max: '2012-01-01'
	},
	location: {
		type: String,
		trim: true
	},
	profilePicture: String,
	curriculumVitae: String,
	video: String,
	about: String,
	appliedClub: [{
		type: ObjectId,
		ref: 'Club'
	}],
	acceptedClub: [{
		type: ObjectId,
		ref: 'Club'
	}],
	appliedScholarsip: [{
		type: ObjectId,
		ref: 'Scholarship'
	}],
	skillId: [{
		type: ObjectId,
		ref: 'Skill'
	}]
});

const Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;