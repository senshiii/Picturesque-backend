const User = require('../models/User');
const Image = require('../models/Images');

exports.addImage = (req, res) => {
    const { url, access } = req.body;
    Image.create({
        url,
        access,
        owner: req.userId
    }).then(img => {
        User.findById(req.userId)
            .then(user => {
                user.images.push(img.id);
                user.save()
                    .then(user => {
                        // TODO: Decide what to do after image uload;
                        res.json({ upload: img })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.deleteImg = (req, res) => {
    Image.findByIdAndDelete(req.params.id)
        .then(delImg => res.status(200).json(delImg))
        .catch(err => console.log(err));
};


