const User = require('../models/user.model');
const resp = require('./responseHandling');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userLogin = (req, res, next) =>{
	User.findOne({email: req.body.email}, (err, userData) => {
		if (err) resp(res, false, "something went wrong, no data is retrieved", err);
		else if (userData !== null) comparePassword(userData);
		else resp(res, false, "email or password is incorrect")
	});

	function comparePassword(userData) {
		bcrypt.compare(req.body.password, userData.password, (err, isRegistered) => {
			if (err) resp(res, false, "something went wrong, no data is retrieved", err);
			else createToken(isRegistered, userData);
		});
	}

	function createToken(isRegistered, userData) {
		jwt.sign({id: userData._id}, process.env.SECRET_KEY, (err, token) => {
			if (err) resp(res, false, "something went wrong, no data is retrieved", err);
			else {
				handleFunc(token, userData);
			}
		});
	}

	function handleFunc(token, userData) {
		req.data = {token: token}
		req.userId = userData._id;
		next();
	}
}

module.exports = userLogin;