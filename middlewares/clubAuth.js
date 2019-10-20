const Club = require('../models/club.model');
const responseHandling = require('./responseHandling');

const clubAuth = (req, res, next) => {
	Club.findOne({userId: req.userId})
		.then(clubData => {
			if (clubData) {
				req.clubId = clubData._id;
				next();
			} else {
				responseHandling(res, false, "please login with your club account");
			}
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

module.exports = clubAuth;