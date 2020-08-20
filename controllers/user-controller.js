const User = require('../models/User');
const Image = require('../models/Images');

exports.addImage = (req, res) => {
	if (req.params.userId !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
	const { url, access, size, tags } = req.body;
	Image.create({
		dataUrl: url,
		owner: req.userId,
		access,
		size,
		tags: tags.split('#').filter(el => el.length > 0).slice(0,5)
	})
		.then((img) => {
			User.findById(req.userId)
				.then((user) => {
					user.images.push(img.id);
					user.storage += img.size;
					user
						.save()
						.then((user) => {
							// TODO: Decide what to do after image uload;
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

exports.getProfileInfo = (req, res) => {
	User.findById(req.params.userId)
		.select('-password -createdAt -updatedAt -__v')
		.populate('images', '-updatedAt -__v')
		.then((user) => res.json(user))
		.catch((err) => {
			console.log(err);
		});
};

exports.deleteImg = (req, res) => {
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
