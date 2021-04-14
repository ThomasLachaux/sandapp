const { Router } = require('express');
const register = require('./register');
const login = require('./login');
const { validateBody } = require('../../middlewares/validate');
const { UserSchema } = require('../../utils/validate');

const router = Router();
const validateUser = validateBody(UserSchema);

router.post('/login', validateUser, login);
router.post('/register', validateUser, register);

module.exports = router;
