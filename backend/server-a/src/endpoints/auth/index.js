const { Router } = require('express');
const register = require('./register');
const login = require('./login');

const router = Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;
