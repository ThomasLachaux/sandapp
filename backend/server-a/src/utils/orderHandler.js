const sendTask = require('./rabbitmq/sendTask');
const Order = require('../database/order.model');

module.exports = {
  sendToQueue: async (order) => {
    const orderBuffer = Buffer.from(JSON.stringify(order));
    try {
      await sendTask.send(orderBuffer);
      console.log(`Order ${order._id} sent in preparation queue.`);
      const status = 'inQueue';
      await Order.updateOne({ _id: order._id }, { $set: { status } });
    } catch (error) {
      console.warn(`Order ${order._id} preparation failed.`);
      const status = 'failed';
      await Order.updateOne({ _id: order._id }, { $set: { status } });
    }
  },
  receiveFromQueue: async (message, channel) => {
    const order = JSON.parse(message.content.toString());
    channel.ack(message);
    await Order.updateOne({ _id: order._id }, { $set: { status: order.status } });
  },
};
