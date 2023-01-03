const cron = require('node-cron');
const amqp = require('amqplib');

const logger = require('../utils/logger');

const FetchYoutubeVideosProducerJob = cron.schedule(
  '*/10 * * * * *',
  async () => {
    const jobLogger = logger.getLogger('FetchYoutubeVideosProducerJob');
    const timeStamp = new Date().toLocaleString();
    jobLogger.info('Invoked FetchYoutubeVideosProducerJob :', timeStamp);
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_HOST);
      const channel = await connection.createChannel();
      await channel.assertQueue('test-queue');

      // const msgBuffer = Buffer.from(JSON.stringify({ searchQuery: 'sports' }));
      // await channel.sendToQueue('test-queue', msgBuffer, { persistent: true });

      await channel.close();
      await connection.close();
    } catch (ex) {
      jobLogger.error('rabbitmq producer error :', ex);
    }
  },
  {
    scheduled: false,
    timezone: 'Asia/Kolkata',
  },
);

module.exports = FetchYoutubeVideosProducerJob;
