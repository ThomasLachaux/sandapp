const { Router } = require('express');
const getOrders = require('./getOrders');
const postOrder = require('./postOrder');
const getOrderById = require('./getOrderById');
const ensureAdmin = require('../../middlewares/ensureAdmin');

const router = Router();

router.get('/', ensureAdmin, getOrders);
router.post('/', postOrder);
router.get('/:orderId', ensureAdmin, getOrderById);

module.exports = router;
