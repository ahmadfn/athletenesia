const User = require('../models/user.model');
const responseHandling = require('./responseHandling');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req, res, next) => {
	const token = req.headers.authorization;

	jwt.verify(token, process.env.SECRET_KEY, {algorithms: ['HS256']} ,(err, decoded) => {
		if (err) responseHandling(res, false, "something went wrong, no data retrieved", err);
		else findUser(decoded);
	})

	function findUser(decoded) {
		User.findById(decoded.id)
			.then(userData => {
				if (userData) {
					req.userId = userData._id;
					next();
				} else {
					responseHandling(res, false, "please login to your account or sign up if you have none");
				}
			})
			.catch(err => responseHandling(res, false, "something went wrong, no data retrieved", err));
	}
}

module.exports = authentication;