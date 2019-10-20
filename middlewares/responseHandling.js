const responseHandling = (res, success, message, resultData) => {
	res.json({
		success: success,
		message: message,
		data: resultData
	});
}

module.exports = responseHandling;