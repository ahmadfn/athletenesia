const User = require('../models/user.model');
const Athlete = require('../models/athlete.model');
const Club = require('../models/club.model');
const resp = require('../middlewares/responseHandling');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.userCreate = (req, res) => {
	User.findOne({email: req.body.email}, (err, result) => {
		if (err) resp(res, false, "something went wrong, process failed", err);
		else if (result) resp(res, false, "email has already been taken");
		else hashPassword();
	})

	function hashPassword() {
		bcrypt.hash(req.body.password, 10, createUser);
	}

	function createUser(err, hashed) {
		if (err) resp(res, false, "something went wrong, process failed", err);
		else {
			User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashed
			}, handleUser);
		}
	}

	function handleUser(err, userCreated) {
		if (err) resp(res, false, "something went wrong, process failed", err);
		else {
			// this query is taken from '/sign-up?joinAs=athlete' or '/sign-up?joinAs=club'
			const joinAs = req.query.joinAs;

			if (joinAs === 'athlete') {
				createAthlete(userCreated);
			} else if (joinAs === 'club') {
				createClub(userCreated);
			}			
		}
	}

	function createAthlete(userCreated) {
		Athlete.create({
			userId: userCreated._id
		})
		.then(athleteCreated => handleFunc(athleteCreated, userCreated))
		.catch(err => resp(res, false, "something went wrong, process failed", err));
	}

	function createClub(userCreated) {
		Club.create({
			clubName: userCreated.firstName,
			userId: userCreated._id
		})
		.then(clubCreated => handleFunc(clubCreated, userCreated))
		.catch(err => resp(res, false, "something went wrong, process failed", err));
	}

	function handleFunc(child, user) {
		resp(res, true, "account is created", {user, child});
	}
}

exports.userShowAll = (req, res) => {
	User.find()
		.then(allUser => {
			resp(res, true, 'all user showed', allUser)
		})
		.catch(err => {
			resp(res, false, 'error show all user', err)
		})
}

exports.userShow = (req, res) => {
	User.findById(req.params.id)
		.then(userData => {
			if (userData) {
				resp(res, true, 'user showed', userData)
			} else {
				resp(res, false, 'error showed user')
			}
		})
		.catch(err => {
			resp(res, false, 'cannot find user', err)
		})
}

exports.userEdit = (req, res) => {
	if (req.body.password) {
		bcrypt.hash(req.body.password, 10)
			.then(hashed => {
				req.body.password = hashed;
				updateUser();
			})
			.catch(err => resp(res, false, "something went wrong, process failed", err));
	} else {
		updateUser();
	}

	function updateUser() {
		User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false, runValidators: true })
			.then(userUpdate => {
				resp(res, true, 'user updated', userUpdate)
			})
			.catch(err => {
				resp(res, false, 'fail to update', err)
			})
	}
}