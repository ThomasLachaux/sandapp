const Order = require('../../database/order.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findOne({ _id: orderId });
      if (!order) {
        return notFound(res, errors.orderNotFound);
      }
      return ok(res, order);
    } catch (error) {
      return next(error);
    }
  },
];
