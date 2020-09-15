// middleware for authorization
function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		// forbidden
		res.status(403).json({ message: 'Not Authorized!' });
	}
}

module.exports = verifyToken;
