const Sport = require('../models/sport.model');
const responseHandling = require('../middlewares/responseHandling');

const findAll = (req, res) => {
	Sport.find()
		.then(result => responseHandling(res, true, "sports data are retrieved", result))
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

module.exports = { findAll }