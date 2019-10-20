const responseHandling = require('./responseHandling');

const authorizationTemp = (res, model, paramsId, userId, next) => {
	model.findById(paramsId)
		.then(data => {
			if (!data) responseHandling(res, false, "there is no associated data avalaible");
			else {
				if (String(data.userId) === String(userId) || String(data._id) === String(userId)) next();
				else responseHandling(res, false, "you are not authorized");
			}
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}

module.exports = authorizationTemp;