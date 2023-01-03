const {
  createLogger, format, transports, config,
} = require('winston');

const {
  combine, timestamp, json, colorize,
} = format;

const getLogger = (component) => createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    colorize(),
    json(),
  ),

  transports: [new transports.Console(), new transports.File({ filename: 'combined.log' })],
});

module.exports = {
  getLogger,
};
