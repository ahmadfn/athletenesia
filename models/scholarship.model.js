const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const scholarshipSchema = new mongoose.Schema({
	scholarshipName: {
		type: String,
		required: [true, "scholarship name must be filled"]
	},
	clubId: {
		type: ObjectId,
		ref: 'Club'
	},
	quota: Number,
	description: String,
	prerequisites: [String],
	startDate: Date,
	endDate: Date,
	appliedAthlete: [{
		type: ObjectId,
		ref: 'Athlete'
	}]
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;