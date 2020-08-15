const User = require("../models/User");
const Image = require("../models/Images");

exports.addImage = (req, res) => {
  if (req.params.userId !== req.userId)
    return res.status(403).json({ message: "Unauthorized" });
  const { url } = req.body;
  Image.create({
    dataUrl: url,
    owner: req.userId,
  })
    .then((img) => {
      User.findById(req.userId)
        .then((user) => {
          user.images.push(img.id);
          user
            .save()
            .then((user) => {
              // TODO: Decide what to do after image uload;
              res.json({ upload: img });
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
    console.log(req.params.userId);
  User.findById(req.params.userId)
    .select("-password -createdAt -updatedAt -__v")
    .populate("images")
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteImg = (req, res) => {
  Image.findByIdAndDelete(req.params.id)
    .then((delImg) => res.status(200).json(delImg))
    .catch((err) => console.log(err));
};
