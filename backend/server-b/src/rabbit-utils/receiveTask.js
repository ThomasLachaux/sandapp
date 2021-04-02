const amqp = require('amqplib');

module.exports.startConsumer = async (connectionUrl, queueName, callback) => {
  try {
    const connection = await amqp.connect(connectionUrl);
    const channel = await connection.createChannel();

    process.once('SIGINT', () => {
      channel.close();
      connection.close();
    });

    await channel.assertQueue(queueName, { durable: true });
    await channel.prefetch(1);
    await channel.consume(queueName, (msg) => callback(msg, channel), { noAck: false });
    console.log(new Date(), ' [*] Waiting for messages. To exit press CTRL+C');
  } catch (error) {
    console.log(error);
  }
};
