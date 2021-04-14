const { Router } = require('express');
const getOrders = require('./getOrders');
const postOrder = require('./postOrder');
const getOrderById = require('./getOrderById');
const ensureAdmin = require('../../middlewares/ensureAdmin');
const { validateBody } = require('../../middlewares/validate');
const { OrderSchema } = require('../../utils/validate');

const router = Router();
const validateOrder = validateBody(OrderSchema);

router.get('/', ensureAdmin, getOrders);
router.post('/', validateOrder, postOrder);
router.get('/:orderId', ensureAdmin, getOrderById);

module.exports = router;
