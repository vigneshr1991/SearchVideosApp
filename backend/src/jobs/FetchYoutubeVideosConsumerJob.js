require('dotenv').config();
const amqp = require('amqplib');
const mongoose = require('mongoose');

const videoService = require('../services/VideoService');
const jobService = require('../services/JobService');

const logger = require('../utils/logger');

const jobLogger = logger.getLogger('FetchYoutubeVideosConsumerJob');

const dbURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
const amqpUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

const FetchYoutubeVideosConsumerJob = async () => {
  jobLogger.info('Started FetchYoutubeVideosConsumerJob');
  const jobKey = 'fetchYoutubeVideosConsumer';

  const queue = process.env.SEARCH_QUERY_QUEUE;

  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = await amqp.connect(amqpUrl);
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
