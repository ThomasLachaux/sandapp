const amqp = require('amqplib');

module.exports.connect = (connectionUrl) =>
  new Promise((resolve) => {
    const attempt = () => {
      amqp
        .connect(connectionUrl)
        .then(resolve)
        .catch(() =>
          setTimeout(() => {
            console.warn('Trying to connect to RabbitMQ...');
            attempt();
          }, 2000),
        );
    };
    attempt();
  });
