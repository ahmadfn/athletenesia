const user = require('../controllers/user.controller');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization');

module.exports = app => {
	app.get('/users', user.userShowAll);
	app.get('/users/:id', user.userShow);
	app.put('/users/:id', authentication, authorization.user, user.userEdit);
	app.post('/sign-up', user.userCreate);
}