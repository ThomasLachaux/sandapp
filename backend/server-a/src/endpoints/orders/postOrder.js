const pick = require('lodash.pick');
const Order = require('../../database/order.model');
const nanoid = require('../../utils/nanoid');
const { created } = require('../../utils/responses');
const orderHandler = require('../../utils/orderHandler');

module.exports = [
  async (req, res, next) => {
    try {
      const { content } = req.body;
      // TODO: add Joi validation
      const displayId = nanoid();
      const status = 'received';
      const newOrder = new Order({
        displayId,
        madeBy: req.user._id,
        content,
        status,
        createdAt: new Date(),
      });
      await newOrder.save();
      const order = pick(newOrder, ['content', 'madeBy', 'displayId', '_id', 'status', 'createdAt']);
      await orderHandler.sendToQueue(order);
      return created(res, order);
    } catch (error) {
      return next(error);
    }
  },
];
