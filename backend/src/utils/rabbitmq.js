const amqp = require('amqplib');

const amqpUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

const connect = () => {
  const conn = amqp.connect(amqpUrl);
  return conn;
};

module.exports = {
  connect,
};
