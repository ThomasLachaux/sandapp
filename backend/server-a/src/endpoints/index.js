const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const router = Router();

router.use('/auth', require('./auth/index'));
router.use('/orders', ensureAuthenticated, require('./orders/index'));
router.use('/sandwiches', ensureAuthenticated, require('./sandwiches/index'));
router.use('/users', ensureAuthenticated, require('./users/index'));

module.exports = router;
