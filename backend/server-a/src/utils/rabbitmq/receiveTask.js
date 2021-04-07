const { connect } = require('./connect');

module.exports.startConsumer = async (connectionUrl, queueName, callback) => {
  try {
    const connection = await connect(connectionUrl);
    const channel = await connection.createChannel();

    process.once('SIGINT', () => {
      channel.close();
      connection.close();
    });

    await channel.assertQueue(queueName, { durable: true });
    await channel.prefetch(1);
    await channel.consume(queueName, (msg) => callback(msg, channel), { noAck: false });
  } catch (error) {
    console.log(error);
  }
};
