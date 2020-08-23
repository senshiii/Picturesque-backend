const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
	const { name, email, password, bio } = req.body;
	console.log(req.body);
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ message: 'User with given email already exists' });
		bcrypt
			.hash(password, 16)
			.then((hash) => {
				User.create({
					name,
					email,
					password: hash
				})
					.then((createdUser) => {
						const token = jwt.sign({ id: createdUser.id }, process.env.ACCESS_TOKEN_SECRET);
						res.status(200).json({
							token,
							user: {
								id: createdUser.id,
								name: createdUser.name
							}
						});
					})
					.catch((err) => {
						res.status(500).json({ message: 'Something went wrong. :-(. Try again after some time.' })
						console.log(err);
					});
			})
			.catch((err) => {
				res.status(500).json({ message: 'Something went wrong. :-(. Try again after some time.' })
				console.log('Error Hashing Password', err);
			});
	});
};

exports.loginUser = (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email })
		.then((user) => {
			if (!user) return res.status(400).json({ message: 'Invalid credentials' });
			bcrypt
				.compare(password, user.password)
				.then((isMatch) => {
					if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
					const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
					res.status(200).json({
						token,
						user: {
							id: user.id,
							name: user.name
						}
					});
				})
				.catch((err) => {
					console.log('Error comparing passwords', err);
					res.status(500).json({ message: 'Something went wrong. :-(. Try again after some time.' })
				});
		})
		.catch((err) => {
			res.status(500).json({ message: 'Something went wrong. :-(. Try again after some time.' })
			console.log(err);
		});
};
