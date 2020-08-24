const User = require('../models/User');
const Image = require('../models/Images');

// GET PROFILE INFO
exports.getProfileInfo = (req, res) => {
	User.findById(req.params.userId)
		.select('-password -updatedAt -createdAt -__v -storage')
		.populate({
			path: 'images',
			populate: {
				path: 'owner',
				select: 'dpUrl id'
			},
			match: { access: 'public' }
		})
		.exec()
		.then((user) => {
			// console.log('Profile', user);
			res.json(user);
		})
		.catch((err) => {
			console.log(err);
		});
};

// GET LOGGED IN USER PROFILE INFO
exports.getMyProfileInfo = (req, res) => {
	User.findById(req.userId)
		.select('-password -createdAt -updatedAt -__v')
		.populate('images', '-updatedAt -__v')
		.then((user) => {
			// console.log('Profile: ', user);
			res.status(200).json(user);
		})
		.catch((err) => {
			console.log(err);
		});
};

// UPDATE PROFILE INFO
exports.updateProfile = (req, res) => {
	if (req.params.userId != req.userId)
		return res.status(403).json({ message: 'You do not have permission for this action' });
	const body = req.body;
	User.findById(req.params.userId)
		.select('-password -updatedAt -createdAt -__v')
		.exec()
		.then((foundUser) => {
			for (let key of Object.keys(body)) {
				if (key in foundUser) {
					foundUser[key] = body[key];
				}
			}
			foundUser
				.save()
				.then((updatedUser) => {
					updatedUser.populate('images').execPopulate().then((user) => {
						// console.log(user);
						res.status(200).json(user);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

// ADD IMAGE
exports.addImage = (req, res) => {
	if (req.params.userId != req.userId) return res.status(403).json({ message: 'Unauthorized' });
	const { url, access, size, tags, name } = req.body;
	Image.create({
		dataUrl: url,
		owner: req.userId,
		access,
		size,
		name,
		tags: tags.split('#').filter((el) => el.length > 0).slice(0, 5)
	})
		.then((img) => {
			User.findById(req.userId)
				.then((user) => {
					user.images.push(img.id);
					user.storage += img.size;
					user
						.save()
						.then((user) => {
							res.json({ upload: img, storage: user.storage });
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

// DELETE IMAGE
exports.deleteImg = (req, res) => {
	if (req.params.userId != req.userId)
		return res.status(403).json({ message: 'You do not have permission for this action' });
	const { userId, imgId } = req.params;
	Image.findByIdAndDelete(imgId)
		.then((delImg) => {
			User.findById(userId).then((user) => {
				user.images.splice(user.images.indexOf(delImg.id), 1);
				user.storage -= delImg.size;
				user
					.save()
					.then((user) => res.status(200).json({ id: delImg.id, storage: user.storage }))
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => console.log(err));
};

// DELETE PROFILE
exports.deleteProfile = (req, res) => {
	if (req.params.userId != req.userId)
		return res.status(403).json({ message: 'You do not have permission for this action' });
	User.findById(req.params.userId)
		.then(async (user) => {
			for (let img of user.images) {
				await Image.findByIdAndDelete(img);
			}
			user.remove().then(() => res.sendStatus(200)).catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
		});
};
