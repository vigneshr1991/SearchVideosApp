require('dotenv').config();
const http = require('http');

const database = require('./src/utils/database');
const app = require('./src/app');

const logger = require('./src/utils/logger');

async function startServer() {
  const serverLogger = logger.getLogger('server');
  const port = Number(process.env.APP_PORT || '3001');
  app.set('port', port);

  try {
    await database.connectDatabase();
    serverLogger.info('connected to database');
  } catch (error) {
    serverLogger.error('Server start failed :', error);
    process.exit(1);
  }
  const server = http.createServer(app);
  server.listen(port);

  server.on('error', (error) => {
    serverLogger.error(`Failed to start server:\n${error.stack}`);
    process.exit(1);
  });

  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    serverLogger.info(`:::::::::::::: server started and listening on ${bind} ::::::::::::::::::::`);
  });

//   process
//     .on('unhandledRejection', (reason, p) => {
//       serverLogger.error(reason, 'Unhandled Rejection at Promise', p);
//     })
//     .on('uncaughtException', (err) => {
//       serverLogger.error(err, 'Uncaught Exception thrown');
//       process.exit(1);
//     });
}

startServer();
