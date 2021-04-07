require('dotenv').config();

const sendTask = require('./rabbit-utils/sendTask.js');
const receiveTask = require('./rabbit-utils/receiveTask.js');

const connectionUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
console.log('connecting to: ', connectionUrl);
const processingDuration = process.env.PROCESSING_ORDER_DURATION || 10000;

const handleOrder = (msg, channel) => {
  const body = JSON.parse(msg.content.toString());
  console.log(" [x] Received '%s'", body);
  setTimeout(() => {
    console.log(new Date(), ' [x] Done');
    channel.ack(msg);
    sendTask.send('return-orders', Buffer.from(JSON.stringify({ ...body, status: 'ready' })));
  }, processingDuration);
};

sendTask.startPublisher(connectionUrl);
receiveTask.startConsumer(connectionUrl, 'received-orders', handleOrder);
