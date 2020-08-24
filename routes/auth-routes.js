const router = require('express').Router();

const { registerUser, loginUser } = require('../controllers/auth-controller');

const { sanitize } = require('../middlewares/sanitize.middleware');

// REGISTER USER
router.post('/register', [ sanitize ], registerUser);

// LOGIN USER
router.post('/login', [ sanitize ], loginUser);

module.exports = router;
