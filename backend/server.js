#!/usr/bin/env node
require('dotenv').config();
const http = require('http');

const database = require('./src/database');
const app = require('./src/app');
const jobs = require('./src/jobs');

const logger = require('./src/utils/logger');

async function startServer() {
  const serverLogger = logger.getLogger('server');
  const port = Number(process.env.PORT || '3001');
  app.set('port', port);

  try {
    await database.connectDatabase();
    serverLogger.info('connected to database');
    jobs.startAllJobs();
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
