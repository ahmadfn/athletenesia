const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
	sportName: String
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;