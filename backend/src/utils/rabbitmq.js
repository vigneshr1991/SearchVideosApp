const amqp = require('amqplib');

const config = require('../config');

const connect = async () => {
  const conn = await amqp.connect(config.rabbitURL);
  return conn;
};

module.exports = {
  connect,
};
