const Image = require('../models/Images');
const User = require('../models/User');

exports.getAllImages = (req, res) => {
	const { tag } = req.query;
	Image.find({ access: 'public' })
		.where('')
		.select('dataUrl tags')
		.populate('owner', 'name id dpUrl')
		.sort({ createdAt: -1 })
		.exec()
		.then((images) => {
			if (tag) {
				const imgs = images.filter((el) => el.tags.includes(tag));
				res.json({ tag: tag, images: imgs });
			} else {
				res.json(images);
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
