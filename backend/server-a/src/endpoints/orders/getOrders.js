const Order = require('../../database/order.model');
const { ok } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const orders = await Order.find({}).sort({ createdAt: 'desc' });
      return ok(res, orders);
    } catch (error) {
      return next(error);
    }
  },
];
