#!/usr/bin/env node
// Process tasks from the work queue

const amqp = require('amqplib');

module.exports.getTask = function (rabbitHost, queueName) {
  amqp
    .connect(`amqp://${rabbitHost}`)
    .then((conn) => {
      process.once('SIGINT', () => {
        conn.close();
      });
      return conn.createChannel().then((ch) => {
        let ok = ch.assertQueue(queueName, { durable: true });
        ok = ok.then(() => {
          ch.prefetch(1);
        });
        ok = ok.then(() => {
          ch.consume(queueName, doWork, { noAck: false });
          console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });
        return ok;

        function doWork(msg) {
          const body = order.content.toString();
          console.log(" [x] Received '%s'", body);
          const secs = body.split('.').length - 1;
          // console.log(" [x] Task takes %d seconds", secs);
          setTimeout(() => {
            console.log(' [x] Done');
            ch.ack(msg);
          }, secs * 1000);
        }
      });
    })
    .catch(console.warn);
};
