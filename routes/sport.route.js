const sport = require('../controllers/sport.controller');

module.exports = app => {
	app.get('/sports', sport.findAll);
}