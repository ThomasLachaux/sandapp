const Order = require('../../database/order.model');

module.exports = [
  async (req, res, next) => {
    try {
      const orders = await Order.find({});
      return res.status(200).json(orders);
    } catch (error) {
      return next(error);
    }
  },
];
