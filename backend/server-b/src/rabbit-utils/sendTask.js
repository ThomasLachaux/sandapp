const amqp = require('amqplib');

let channel = null;

module.exports.startPublisher = async (connectionUrl) => {
  try {
    const connection = await amqp.connect(connectionUrl);
    channel = await connection.createConfirmChannel();

    process.once('SIGINT', () => {
      channel.close();
      connection.close();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.send = (queueName, content) => {
  channel.sendToQueue(queueName, content, { persistent: true }, (err, ok) => {
    if (err !== null) console.warn(new Date(), 'Message nacked!');
    else console.log(new Date(), 'Message acked');
  });
};
