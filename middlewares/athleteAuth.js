const Athlete = require('../models/athlete.model');
const responseHandling = require('./responseHandling');

const athleteAuth = (req, res, next) => {
	Athlete.findOne({userId: req.userId})
		.then(athleteData => {
			if(athleteData) {
				req.athleteId  = athleteData._id;
				next();
			} else {
				responseHandling(res, false, "please login using your athlete account");
			}
		}) 
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

module.exports = athleteAuth;