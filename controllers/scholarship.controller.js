const Scholarship = require('../models/scholarship.model');
const Club = require('../models/club.model');
const responseHandling = require('../middlewares/responseHandling');


exports.scholarshipCreate = (req, res) => {
	const clubId = req.clubId;

	const newScholarship = new Scholarship({
		scholarshipName: req.body.scholarshipName,
		clubId: clubId,
		quota: req.body.quota,
		description: req.body.description,
		startDate: req.body.dateFrom,
		endDate: req.body.endDate,
	});

	newScholarship.save()
		.then(savedData => {
			return Club.findByIdAndUpdate(savedData.clubId, {$push: {scholarshipOffered: savedData._id}}, {new: true});
		})
		.then(updatedClub => responseHandling(res, true, "scholarship is saved", updatedClub))
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

exports.scholarshipShowAll = (req, res) => {
	Scholarship.find()
		.populate({path: 'clubId', select: ['userName', 'clubAbout']})
		.then(data => {
			if (data.length === 0) responseHandling(res, true, "there is no scholarship available, yet", data);
			else responseHandling(res, true, "scholarships data are retrieved", data);
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

exports.scholarshipDetail = (req, res) => {
	Scholarship.findById(req.params.id)
		.populate({path: 'clubId', select: ['clubName', 'clubAbout']})
		.then(data => {
			if (data !== null) responseHandling(res, true, "scholarship data are retrieved", data);
			else responseHandling(res, false, "scholarships data are not available");
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

exports.scholarshipUpdate = (req, res) => {
	Scholarship.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
		.then(updated => responseHandling(res, true, "scholarship data is updated", updated))
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

exports.scholarshipDelete = (req, res) => {
	Scholarship.findByIdAndDelete(req.params.id, (err, deletedScholar) => {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err)
		else {
			if (deletedScholar !== null) deleteFromClub(deletedScholar);
			else responseHandling(res, false, "there is no associated data available");
		}
	});

	function deleteFromClub(deletedScholar) {
		Club.findByIdAndUpdate(deletedScholar.clubId, {$pull: {scholarshipOffered: deletedScholar._id}}, {$new: true}, (err, result) => {
			if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
			else {
				if (result !== null) handleFunc(deletedScholar, result);
				else responseHandling(res, false, "there is no associated data available"); 
			}
		});
	}

	function handleFunc(deletedScholar, result) {
		responseHandling(res, true, "scholarship has been deleted", {deletedScholar, result});
	}
}

exports.scholarshipApply = (req, res) => {
	// this will take care of route '/scholarships/:id/apply'
	Scholarship.findById(req.params.id, (err, data) => {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else {
			if (data !== null) updateScholarship(data);
			else responseHandling(res, false, "there is no scholarship available");
		}
	});

	function updateScholarship(scholarshipData) {
		scholarshipData.update({
			appliedAthlete: [...scholarshipData, req.userId]
		}, updateAthlete);
	}

	function updateAthlete(err, updatedScholarship) {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else {
			Athlete.findByIdAndUpdate(req.userId, {
				$push: {appliedScholarship: updatedScholarship._id, appliedClub: updatedScholarship.clubId}
			}, {new: true}, handleFunc);
		}
	}

	function handleFunc(err, updatedAthlete) {
		if (err) responseHandling(res, false, "something went wrong, no data is retrieved", err);
		else {
			if (updatedAthlete !== null) responseHandling(res, true, "data is updated", updatedAthlete);
			else responseHandling(res, false, "there is no athlete available");
		}
	}
}