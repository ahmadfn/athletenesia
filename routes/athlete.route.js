const athlete = require('../controllers/athlete.controller');
const userLogin = require('../middlewares/userLogin');
const authentication = require('../middlewares/authentication');
const athleteAuth = require('../middlewares/athleteAuth');
const authorization = require('../middlewares/authorization');

module.exports = app => {
    //app.post('/add-athlete', athlete.athleteCreate);
    app.get('/athletes', athlete.athleteShowAll);
    app.get('/athlete/:id', athlete.athleteShow);
    app.delete('/athlete/:id', authentication, authorization.athlete, athlete.athleteDelete);
    app.patch('/athlete/:id', authentication, authorization.athlete, athlete.athleteEdit);
    app.post('/athlete/login', userLogin, athleteAuth, athlete.login);
}