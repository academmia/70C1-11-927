const jwt = require('jsonwebtoken');
const routes = require('express').Router();
const user = require('../models/user');

// login route
routes.post('/login', (req, res) => {
	console.log(req.body);
	if (!req.body.email) {
		return res.status(404).json({
			message: 'No email Entered.'
		});
	} else {
		const userEntered = {
			email: req.body.email,
			password: req.body.password
		};

		if (user.password === userEntered.password) {
			const token = jwt.sign(
				{ 
					id: user.id,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000) + (60)  // 60 * 60 - o ora
				},
				process.env.JWT_SECRET,
				(err, token) => {
					res.status(200).json({ auth: true, token: token });
				}
			);
		} else {
			res
				.status(401)
				.json({ auth: false, token: null, message: 'Wrong Password!' });
		}
	}
});

module.exports = routes;
