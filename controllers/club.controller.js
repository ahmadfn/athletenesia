const Club = require('../models/club.model');
const User = require('../models/user.model');
const Scholarship = require('../models/scholarship.model');
const bcrypt = require('bcrypt');
const responseHandling = require('../middlewares/responseHandling');


exports.clubCreate = (req, res) => {
	User.findOne({email: req.body.email}, (err, result) => {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else if (result) responseHandling(res, false, "email has already been taken");
		else hashPassword();
	});

	function hashPassword() {
		bcrypt.hash(req.body.password, 10, createUser);
	}

	function createUser(err, hashed) {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else {
			User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashed
			}, createClub);
		}
	}

	function createClub(err, userCreated) {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else {
			Club.create({
				userId: userCreated._id
			}, handleFunc);
		}
	}

	function handleFunc(err, result) {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else responseHandling(res, true, "club is created", result);
	}
}

exports.clubShowAll = (req, res) => {
	Club.find()
		.populate(
			[
				{path: 'userId', select: ['firstName', 'lastName', 'email']},
				{path: 'sport', select: 'sportName'}
			]
		)
		.then(clubs => {
			if (clubs.length > 0) responseHandling(res, true, "clubs data are retrieved", clubs);
			else if (clubs.length === 0) responseHandling(res, true, "there is no club available, yet", clubs);
			//else responseHandling(res, false, "no club data is available");
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

exports.clubDetail = (req, res) => {
	Club.findById(req.params.id)
		.populate(
			[
				{path: 'userId', select: ['firstName', 'lastName', 'email']},
				{path: 'sport', select: 'sportName'},
				{path: 'scholarshipOffered', select: ['scholarshipName', 'quota', 'startDate', 'endDate']},
				{path: 'appliedAthlete', select: ['status', 'location', 'profilePicture']}
				{path: 'appliedAthlete.userId', select: ['firstName', 'lastName']},
				{path: 'appliedAthlete.sport', select: 'sportName'}
			]
		)
		.then(detail => {
			if (detail) responseHandling(res, true, "detail information is retrieved", detail);
			else responseHandling(res, false, "something went wrong, no data is retrieved");
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

exports.clubUpdate = (req, res) => {
	Club.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
		.then(updatedClub => responseHandling(res, true, "club data is updated", updatedClub))
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

exports.clubDelete = (req, res) => {
	Club.findByIdAndDelete(req.params.id, (err, deletedClub) => {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else {
			deleteScholarships(deletedClub);
		}
	});

	function deleteScholarships(deletedClub) {
		Scholarship.deleteMany({clubId: deletedClub._id}, (err, deleted) => {
			if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
			else deleteUser(deletedClub);
		})
	}

	function deleteUser(deletedClub) {
		User.findByIdAndDelete(deletedClub.userId, (err, deletedUser) => {
			if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
			else responseHandling(res, true, "club is deleted", deletedUser);
		});
	}
}

exports.login = (req, res) => {
	const data = {
		token: req.data.token,
		clubId: req.clubId
	}

	responseHandling(res, true, "you are logging in", data);
}