require('dotenv').config();

const database = require('../utils/database');
const videoService = require('../services/VideoService');
const jobService = require('../services/JobService');
const rabbitmq = require('../utils/rabbitmq');
const config = require('../config');

const logger = require('../utils/logger');

const jobLogger = logger.getLogger('FetchYoutubeVideosConsumerJob');

const FetchYoutubeVideosConsumerJob = async () => {
  jobLogger.info('Started FetchYoutubeVideosConsumerJob');
  const jobKey = 'fetchYoutubeVideosConsumer';

  const queue = config.searchQueue;

  try {
    await database.connectDatabase();
    const connection = await rabbitmq.connect();
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);

    channel.consume(queue, async (message) => {
      jobLogger.info('Invoked FetchYoutubeVideosConsumerJob');
      const payload = JSON.parse(message.content.toString());
      jobLogger.info(`Received payload data: ${payload.searchQuery}`);

      const { searchQuery } = payload;
      const job = await jobService.getByJobKey(jobKey);

      if (job) {
        const { metadata } = job;
        const { nextPageToken } = metadata;

        const fetchYTResponse = await videoService.fetchYoutubeVideos(
          searchQuery, 50, nextPageToken);
        const { nextPageToken: newNextPageToken, videos } = fetchYTResponse;

        if (newNextPageToken) {
          const findConstraint = { jobKey };
          const updateData = { 'metadata.nextPageToken': newNextPageToken };
          const promiseArr = [
            videoService.upsertManyVideos(videos),
            jobService.updateJob(findConstraint, updateData),
          ];
          await Promise.all(promiseArr);

          jobLogger.info('Youtube video saved successfully');
        } else {
          jobLogger.info('exhausted ::::::::::::');
        }
      }

      jobLogger.info('Finished FetchYoutubeVideosConsumerJob');
      channel.ack(message);
    });
  } catch (err) {
    jobLogger.error('rabbitmq consumer error :', err);
  }
};

FetchYoutubeVideosConsumerJob();

// module.exports = FetchYoutubeVideosConsumerJob;
