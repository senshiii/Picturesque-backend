const router = require('express').Router();

const { uploadImage } = require('../controllers/image-controller');

router.post('/', uploadImage);

module.exports = router;