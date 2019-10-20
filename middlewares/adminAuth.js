const Admin = require('../models/admin.model');
const responseHandling = require('./responseHandling');

const adminAuth = (req, res, next) => {
	Admin.findByOne({userId: req.userId})
		.then(adminData => {
			if (adminData) {
				req.adminId = adminData._id;
				next();
			} else {
				responseHandling(res, false, "you are not authorized");
			}
		})
		.catch(err => responseHandling(res, false, "something went wrong, no data is retrieved", err));
}