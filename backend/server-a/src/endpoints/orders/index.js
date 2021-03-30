const { Router } = require('express');
const getOrders = require('./getOrders');
const postOrder = require('./postOrder');
const getOrderById = require('./getOrderById');

const router = Router();

router.get('/', getOrders);
router.post('/', postOrder);
router.get('/:orderId', getOrderById);

module.exports = router;
