const Order = require('../../database/order.model');
const { ok, notFound, errors } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const orders = await Order.find({ madeBy: _id });
      return ok(res, orders);
    } catch (error) {
      return next(error);
    }
  },
];
