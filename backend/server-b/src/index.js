require('dotenv').config();

const sendTask = require('./rabbit-utils/sendTask.js');
const receiveTask = require('./rabbit-utils/receiveTask.js');

const connectionUrl = process.env.MQ_URL || 'amqp://localhost';
const processingDuration = process.env.PROCESSING_ORDER_DURATION || 10000;

const handleOrder = (msg, channel) => {
  const body = msg.content.toString();
  console.log(" [x] Received '%s'", body);
  setTimeout(() => {
    console.log(new Date(), ' [x] Done');
    channel.ack(msg);
    sendTask.send('return-order', Buffer.from(JSON.stringify(body)));
  }, processingDuration);
};

sendTask.startPublisher(connectionUrl);
receiveTask.startConsumer(connectionUrl, 'received-orders', handleOrder);
