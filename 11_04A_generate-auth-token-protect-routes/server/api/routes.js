const routes = require('express').Router();
const data = require('../db/db.json');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

// db queries
const findByProjectId = (id, cb) => {
	if (!data.projects[id]) {
		return cb(new Error('No Matching Id' + id));
	}

	return cb(null, data.projects[id]);
};

// Get a list of all projects
routes.get('/projects', (req, res) => {
	res.status(200).json(data.projects);
});

// find a project by id
routes.get('/projects/:id', (req, res, next) => {
	const id = req.params.id;

	findByProjectId(id, (error, project) => {
		if (error) {
			return next(error);
		}
		return res.status(200).json(project);
	});
});

// add a new project
routes.post(
	'/projects/add/project',
	[
		check('id')
			.trim()
			.matches(/\d/)
	],
	(req, res, next) => {
		const id = req.body.id;
		console.log(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ error: errors.mapped() });
		} else {
			return res.json(req.body);
		}
	}
);

// Get a list of all tasks

routes.get('/tasks', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.status(200).json({ data: data.tasks, authData });
		}
	});
});

// login route
routes.post('/login', (req, res) => {
	// Mock User

	const user = {
		id: 1,
		username: 'Alice',
		email: 'alice@gmail.com'
	};

	// send the user as payload
	jwt.sign({ user: user }, process.env.JWT_SECRET, (err, token) => {
		res.json({
			token: token
		});
	});
});

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
		res.sendStatus(403);
	}
}

module.exports = routes;
