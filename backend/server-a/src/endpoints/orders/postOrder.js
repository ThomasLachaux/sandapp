const Order = require('../../database/order.model');
const nanoid = require('../../utils/nanoid');
const pick = require('lodash.pick');
const { created } = require('../../utils/responses');

module.exports = [
  async (req, res, next) => {
    try {
      const { content } = req.body;
      // TODO: add Joi validation
      const displayId = nanoid();
      const status = 'pending';
      const newOrder = new Order({
        displayId,
        madeBy: req.user._id,
        content,
        status,
        createdAt: new Date(),
      });
      await newOrder.save();
      // TODO: send signal to rabbitmq/server B
      const orderCallback = pick(newOrder, ['content', 'madeBy', 'displayId', '_id', 'status', 'createdAt']);
      return created(res, orderCallback);
    } catch (error) {
      return next(error);
    }
  },
];
