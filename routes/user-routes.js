const router = require("express").Router();
const { addImage, getMyProfileInfo, getProfileInfo, deleteImg } = require("../controllers/user-controller");
const { validateToken } = require("../middlewares/auth-middleware");

router.post("/:userId/images", validateToken, addImage);

router.get("/profile",validateToken, getMyProfileInfo);

router.delete('/:userId/images/:imgId', deleteImg);

router.get('/:userId/profile', getProfileInfo);

module.exports = router;
