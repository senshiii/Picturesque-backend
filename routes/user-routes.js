const router = require("express").Router();
const { addImage, getProfileInfo } = require("../controllers/user-controller");
const { validateToken } = require("../middlewares/auth-middleware");

router.post("/:userId/images", validateToken, addImage);

router.get("/:userId/profile", getProfileInfo);

module.exports = router;
