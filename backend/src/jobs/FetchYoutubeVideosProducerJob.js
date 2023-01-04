require('dotenv').config();
const cron = require('node-cron');
const amqp = require('amqplib');

const logger = require('../utils/logger');

const jobLogger = logger.getLogger('FetchYoutubeVideosProducerJob');

const amqpUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

const FetchYoutubeVideosProducerJob = cron.schedule(
  '*/10 * * * * *',
  async () => {
    const timeStamp = new Date().toLocaleString();
    jobLogger.info('Invoked FetchYoutubeVideosProducerJob :', timeStamp);

    const queue = process.env.SEARCH_QUERY_QUEUE;
    try {
      const connection = await amqp.connect(amqpUrl);
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
