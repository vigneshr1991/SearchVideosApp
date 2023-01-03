const amqp = require('amqplib');

const videoService = require('../services/VideoService');
const jobService = require('../services/JobService');

const logger = require('../utils/logger');

const FetchYoutubeVideosConsumerJob = async () => {
  const jobLogger = logger.getLogger('FetchYoutubeVideosConsumerJob');
  jobLogger.info('Invoked FetchYoutubeVideosConsumerJob');
  const jobKey = 'fetchYoutubeVideosConsumer';
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_HOST);
    const channel = await connection.createChannel();
    await channel.assertQueue('test-queue');
    channel.consume('test-queue', async (message) => {
      const payload = JSON.parse(message.content.toString());
      jobLogger.debug(`Received payload data: ${payload.searchQuery}`);

      const { searchQuery } = payload;
      const job = await jobService.getByJobKey(jobKey);
      const { metadata } = job;
      const { nextPageToken } = metadata;

      const fetchYTResponse = await videoService.fetchYoutubeVideos(searchQuery, 50, nextPageToken);
      const { nextPageToken: newNextPageToken, videos } = fetchYTResponse;

      if (newNextPageToken) {
        const findConstraint = { jobKey };
        const updateData = { 'metadata.nextPageToken': newNextPageToken };
        const promiseArr = [
          videoService.upsertManyVideos(videos),
          jobService.updateJob(findConstraint, updateData),
        ];
        await Promise.all(promiseArr);
      } else {
        jobLogger.info('exhausted ::::::::::::');
      }

      channel.ack(message);
    });
  } catch (ex) {
    jobLogger.error('rabbitmq consumer error :', ex);
  }
};

module.exports = FetchYoutubeVideosConsumerJob;
