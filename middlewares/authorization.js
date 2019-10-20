const User = require('../models/user.model');
const Athlete = require('../models/athlete.model');
const Club = require('../models/club.model');
const Scholarship = require('../models/scholarship.model');
const Admin = require('../models/admin.model');
const authorizationTemp = require('./authorizationTemp');

const user = (req, res, next) => {
	authorizationTemp(res, User, req.params.id, req.userId, next);
}

const athlete = (req, res, next) => {
	authorizationTemp(res, Athlete, req.params.id, req.userId, next);
}

const club = (req, res, next) => {
	authorizationTemp(res, Club, req.params.id, req.userId, next);
}

const scholarship = (req, res, next) => {
	authorizationTemp(res, Club, req.clubId, req.userId, next);
}

const admin = (req, res, next) => {
	authorizationTemp(res, Admin, req.adminId, req.userId, next);
}

module.exports = { user, athlete, club, scholarship }