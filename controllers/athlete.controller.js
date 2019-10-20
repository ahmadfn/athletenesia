const Athlete = require('../models/athlete.model');
const User = require('../models/user.model');
const Scholarship = require('../models/scholarship.model');
const bcrypt = require('bcrypt');
const resp = require('../middlewares/responseHandling');


exports.athleteCreate = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) resp(res, false, "the email has already been used");
            else hashPassword();
        })
        .catch(err => resp(res, false, "something went wrong, no data is retrieved", err));

    function hashPassword() {
        const password = req.body.password;
        const saltrounds = 10;

        bcrypt.hash(password, saltrounds, createUser)
    }

    function createUser(err, hashedPassword) {
        if (err) resp(res, false, "something went wrong, no data is retrieved", err);
        else {
           User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            }, createAthlete); 
        }
    }

    function createAthlete(err, data) {
        if (err) resp(res, false, "something went wrong, no data is retrieved", err);
        else {
            Athlete.create({
                userId: data._id
            }, handleFunc);
        }
    }

    function handleFunc(err, result) {
        if (err) resp(res, false, "something went wrong, no data is retrieved", err);
        else resp(res, true, "user is created", result);
    }
}

exports.athleteShowAll = (req, res) => {
    const AthletePromise = Athlete.find().populate({path: 'userId', select: ['firstName', 'lastName']}).exec();

    AthletePromise
        .then(AllAthlete => {
            if (AllAthlete) resp(res, true, 'all athletes data are retrieved', AllAthlete);
            else resp(res, false, 'there is no athlete, yet');
        })
        .catch(err => {
            resp(res, false, 'something went wrong, no data is retrieved', err)
        })
}

exports.athleteShow = (req, res) => {
    Athlete.findById(req.params.id)
        .populate({
            path: 'userId',
            select: ['firstName', 'lastName', 'email']
        })
        .then(DetailAthlete => {
            if (DetailAthlete) {
                resp(res, true, 'detail athlete is shown', DetailAthlete)
            } else {
                resp(res, false, 'detail athlete is not avaliable')
            }
        })
        .catch(err => {
            resp(res, false, 'detail athlete cannot be shown', err)
        })
}

exports.athleteEdit = (req, res) => {
    Athlete.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false, runValidators: true })
    .then(updateAthlete => {
        resp(res, true, 'athlete data is updated', updateAthlete)
    })
    .catch(err => {
        resp(res, false, 'something went wrong, athlete is not updated', err)
    })
}

exports.athleteDelete = (req, res) => {;
    Athlete.findByIdAndDelete(req.params.id, (err, deletedAthlete) => {
        if (err) resp(res, false, "something went wrong", err);
        else {
            deleteScholarship(deletedAthlete);
        }
    });

    function deleteScholarship(deletedAthlete) {
        Scholarship.updateOne({$pull: {appliedAthlete: deletedAthlete._id}}, {new: true}, (err, deleted) => {
            if (err) resp(res, false, "something went wrong", err);
            else deleteUser(deleteAthlete);
        });
    }

    function deleteUser(deletedAthlete) {
        User.findByIdAndDelete(deletedAthlete.userId, (err, deletedUser) => {
            if (err) resp(res, false, "something went wrong", err);
            else resp(res, true, "user is deleted", deletedUser);
        });
    }
}

exports.login = (req, res) => {
    const data = {
        token: req.data.token,
        athleteId: req.athleteId
    }

    resp(res, true, "you are logging in", data);
}