const club = require('../controllers/club.controller');
const userLogin = require('../middlewares/userLogin');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const clubAuth = require('../middlewares/clubAuth');

module.exports = app => {
	//app.post('/add-club', club.clubCreate);
	app.get('/clubs', club.clubShowAll);
	app.get('/clubs/:id', club.clubDetail);
	app.patch('/clubs/:id', authentication, authorization.club, club.clubUpdate);
	app.delete('/clubs/:id', authentication, authorization.club, club.clubDelete);
	app.post('/clubs/login', userLogin, clubAuth, club.login);
}