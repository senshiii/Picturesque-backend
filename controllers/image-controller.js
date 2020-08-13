const Image = require('../models/Images');

exports.uploadImage = (req, res) => {
    const { url } = req.body;
    Image.create({ url })
        .then(img => {
            res.status(200).json(img)
        })
        .catch(err => {
            console.log(err);
        })
};
