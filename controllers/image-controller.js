const Image = require('../models/Images');
<<<<<<< HEAD

// GET ALL IMAGES, BY TAGS OR ALL IMAGES
exports.getAllImages = (req, res) => {
	const { tag } = req.query;
	Image.find({ access: 'public' })
=======
const User = require('../models/User');

exports.getAllImages = (req, res) => {
	const { tag } = req.query;
	Image.find({ access: 'public' })
		.where('')
>>>>>>> 38c46747fd785cc93ebe81a2762e733ca08cf88d
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
