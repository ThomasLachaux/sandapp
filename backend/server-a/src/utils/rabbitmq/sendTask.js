const {connect} = require('./connect');

let channel = null;

module.exports = {
  startPublisher: async (connectionUrl) => {
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
  },
  send: (content) =>
    new Promise((resolve, reject) => {
      channel.assertQueue('received-orders', { durable: true });
      channel.sendToQueue('received-orders', content, { persistent: true }, (err, ok) => {
        if (err !== null) {
          return reject(err);
        }
        return resolve(ok);
      });
    }),

};
