const Order = require('../../database/order.model');
const nanoid = require('../../utils/nanoid');

module.exports = [
  async (req, res, next) => {
    try {
      const { madeBy, content } = req.body;
      // TODO: add Joi validation
      const displayId = nanoid();
      const status = 'pending';
      const newOrder = new Order({
        displayId,
        madeBy,
        content,
        status,
        createdAt: new Date(),
      });
      await newOrder.save();
      // TODO: send signal to rabbitmq/server B
      return res.status(201).json(newOrder);
    } catch (error) {
      return next(error);
    }
  },
];
