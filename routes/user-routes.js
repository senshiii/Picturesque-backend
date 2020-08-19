const router = require("express").Router();
const { addImage, getProfileInfo, deleteImg } = require("../controllers/user-controller");
const { validateToken } = require("../middlewares/auth-middleware");

router.post("/:userId/images", validateToken, addImage);

router.get("/:userId/profile", getProfileInfo);

router.delete('/:userId/images/:imgId', deleteImg);

module.exports = router;
