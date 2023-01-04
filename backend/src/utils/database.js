const mongoose = require('mongoose');

const config = require('../config');
const logger = require('./logger');

const dbLogger = logger.getLogger('mongo-database');

const connectDatabase = () => new Promise((resolve, reject) => {
  dbLogger.info('connecting to mongo db');
  mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('error', (err) => {
    dbLogger.error('mongo connection error', err.message);
    return reject(err);
  });
  mongoose.connection.on('connected', () => {
    dbLogger.info('mongo db is connected');
    return resolve(mongoose.connection);
  });
});

module.exports = { connectDatabase };
