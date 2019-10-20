const home = require('../controllers/home.controller');

module.exports = (app) => {
	app.get('/', home.home);
}