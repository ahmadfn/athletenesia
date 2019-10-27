const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
	sportName: {
		type: String,
		required: [true, "sport is required"]
	}
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;