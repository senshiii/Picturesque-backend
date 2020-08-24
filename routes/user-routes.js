const router = require('express').Router();
const {
	addImage,
	getMyProfileInfo,
	getProfileInfo,
	deleteImg,
	updateProfile,
	deleteProfile
} = require('../controllers/user-controller');
const { validateToken } = require('../middlewares/auth-middleware');
const { sanitize } = require('../middlewares/sanitize.middleware');

// GET LOGGED IN USER ACCOUNT
router.get('/profile', validateToken, getMyProfileInfo);

// GET USER ACCOUNT
router.get('/:userId/profile', getProfileInfo);

// ADD IMAGE ROUTE
router.post('/:userId/images', validateToken, addImage);

// DELETE IMG
router.delete('/:userId/images/:imgId', validateToken, deleteImg);

// DELETE PROFILE
router.delete('/:userId', validateToken, deleteProfile);

// UPDATE PROFILE
router.put('/:userId', [ validateToken, sanitize ], updateProfile);

module.exports = router;
