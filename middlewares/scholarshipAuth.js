const Scholarship = require('../models/scholarship.model');
const responseHandling = require('./responseHandling');

const scholarshipAuth = (req, res, next) => {
	Scholarship.findOne({clubId: req.clubId})
		.then(data => {
			if (data) {
				req.clubId = data.clubId;
				next();
			} else {
				responseHandling(res, false, "please login with right account");	
			}
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

module.exports = scholarshipAuth;