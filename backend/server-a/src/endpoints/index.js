const { Router } = require('express');

const router = Router();

router.use('/auth', require('./auth/index'));
router.use('/orders', require('./orders/index'));
router.use('/sandwiches', require('./sandwiches/index'));
router.use('/users', require('./users/index'));

module.exports = router;
