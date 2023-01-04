require('dotenv').config();
const cron = require('node-cron');

const logger = require('../utils/logger');
const rabbitmq = require('../utils/rabbitmq');
const config = require('../config');

const jobLogger = logger.getLogger('FetchYoutubeVideosProducerJob');

const FetchYoutubeVideosProducerJob = cron.schedule(
  '*/10 * * * * *',
  async () => {
    const timeStamp = new Date().toLocaleString();
    jobLogger.info('Invoked FetchYoutubeVideosProducerJob :', timeStamp);

    const queue = config.searchQueue;
    try {
      const connection = await rabbitmq.connect();
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);

      const msgBuffer = Buffer.from(JSON.stringify({ searchQuery: 'sports' }));
      await channel.sendToQueue(queue, msgBuffer, { persistent: true });

      await channel.close();
      await connection.close();
    } catch (err) {
      jobLogger.error('rabbitmq producer error :', err);
    }
  },
  {
    scheduled: false,
    timezone: 'Asia/Kolkata',
  },
);

FetchYoutubeVideosProducerJob.start();
// module.exports = FetchYoutubeVideosProducerJob;
