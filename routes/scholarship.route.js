const scholarship = require('../controllers/scholarship.controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const clubAuth = require('../middlewares/clubAuth');
const scholarshipAuth = require('../middlewares/scholarshipAuth');

module.exports = app => {
	app.get('/scholarships', scholarship.scholarshipShowAll);
	app.post('/add-scholarship', authentication, clubAuth, scholarship.scholarshipCreate);
	app.get('/scholarships/:id', scholarship.scholarshipDetail);
	app.put('/scholarships/:id', authentication, clubAuth, scholarshipAuth, authorization.scholarship, scholarship.scholarshipUpdate);
	app.delete('/scholarships/:id',authentication, clubAuth, scholarshipAuth, authorization.scholarship, scholarship.scholarshipDelete);
	app.put('/scholarships/:id/apply', authentication, scholarship.scholarshipApply);
}