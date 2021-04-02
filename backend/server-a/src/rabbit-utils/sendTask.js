#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

/*

const amqp = require('amqplib');

module.exports.addTask = function (rabbitHost, queueName, order) {
  amqp.connect(`amqp://${rabbitHost}`).then((c) => {
    c.createConfirmChannel().then((ch) => {
      ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {}, (err, ok) => {
        if (err !== null) console.warn(new Date(), 'Message nacked!');
        else console.log(new Date(), 'Message acked');
      });
    });
  });
};

*/
