require('dotenv').config();
const http = require('http');

const database = require('./src/database');
const app = require('./src/app');

const logger = require('./src/utils/logger');

async function startServer() {
  console.log('PROCESS ENV :', process.env);
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
    serverLogger.info(`Listening on ${bind}`);
  });
}

startServer();
