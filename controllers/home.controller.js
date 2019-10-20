const Scholarship = require('../models/scholarship.model');
const responseHandling = require('../middlewares/responseHandling');

exports.home = (req, res) => {
	Scholarship.find()
		.populate({path: 'clubId', select: ['clubName', 'clubAddress']})
		.then(result => {
			if (result.length > 0) responseHandling(res, true, "scholarships data is retrieved", result);
			else if (result.length === 0) responseHandling(res, true, "there is no scholarship, yet", result);
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}