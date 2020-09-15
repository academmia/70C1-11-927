const jwt = require('jsonwebtoken');
const routes = require('express').Router();
const user = require('../models/user');

// login route
routes.post('/login', (req, res) => {
	// send the user as payload
	jwt.sign(
		{ 
			user: user, 
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + (60)  // 60 * 60 - o ora
		},
		process.env.JWT_SECRET,
		{ algorithm: 'HS256' },
		// { algorithm: 'HS256', expiresIn: '24h' }, // trebuie verificat in formatul UTC
		(err, token) => {
			console.log(err);
			console.log(token);
			res.json({
				token: token
			});
		}
	);
});

module.exports = routes;
