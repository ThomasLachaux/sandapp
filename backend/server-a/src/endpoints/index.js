const { Router } = require('express');

const router = Router();

// Orders routes
router.use('/orders', require('./orders/index'));
router.use('/sandwiches', require('./sandwiches/index'));

module.exports = router;
