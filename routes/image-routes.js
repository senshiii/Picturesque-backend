const router = require('express').Router();
const { getAllImages } = require('../controllers/image-controller');

router.get('/', getAllImages);

module.exports = router;