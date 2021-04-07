const { connect } = require('./connect');

let channel = null;

module.exports.startPublisher = async (connectionUrl) => {
  try {
    const connection = await connect(connectionUrl);
    channel = await connection.createConfirmChannel();

    process.once('SIGINT', () => {
      channel.close();
      connection.close();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.send = async (queueName, content) => {
  try {
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, content, { persistent: true }, (err, ok) => {
      if (err !== null) console.warn(new Date(), 'Message nacked!');
      else console.log(new Date(), 'Message acked');
    });
  } catch (error) {
    console.log(error);
  }
};
