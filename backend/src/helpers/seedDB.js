require('dotenv').config();
const database = require('../utils/database');

const JobModel = require('../models/JobModel');
const YoutubeApiKeyModel = require('../models/YoutubeApiKeyModel');

const logger = require('../utils/logger');

const seedDb = async () => {
  const seedDBLogger = logger.getLogger('seed-db');
  try {
    const dbConn = await database.connectDatabase();
    seedDBLogger.info('DB connected');
    seedDBLogger.info('Started seeding DB');

    const seedJobData = [
      {
        jobName: 'Fetch Youtube Videos Consumer',
        jobKey: 'fetchYoutubeVideosConsumer',
        cronRegex: '*/10 * * * * *',
        metadata: {
          nextPageToken: '',
        },
      },
    ];

    const seedYoutubeApiKeys = [
      {
        projectName: 'SearchVideos',
        apiKey: 'AIzaSyAMPqoAmsEJbGuQLQFzXeWmmXxmDQxkbuw',
        lastUsedAt: new Date(),
        quotaExceedDate: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
      {
        projectName: 'SearchVideos1',
        apiKey: 'AIzaSyAzIDwiobjRnlmc8nghS4Lb9U9Qjle0CeI',
        lastUsedAt: new Date(),
        quotaExceedDate: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
      {
        projectName: 'SearchVideos2',
        apiKey: 'AIzaSyC0467-yc2jFCczwGZZN6154zkxwMpL4Nc',
        lastUsedAt: new Date(),
        quotaExceedDate: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
      {
        projectName: 'SearchVideos3',
        apiKey: 'AIzaSyAnMLtoe81Tr6gHCAF-LD_9Xvf9F20ySWg',
        lastUsedAt: new Date(),
        quotaExceedDate: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
      {
        projectName: 'SearchVideos4',
        apiKey: 'AIzaSyBF5BXdEX6mzzR4m96o-03u4d53Y9xu69Y',
        lastUsedAt: new Date(),
        quotaExceedDate: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
      {
        projectName: 'SearchVideos5',
        apiKey: 'AIzaSyAeRNDpyX_kPGw6JDaPjqhZsF41vlECMQ8',
        lastUsedAt: new Date(),
        quotaExceedDate: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
    ];

    const deletePromiseArr = [
      JobModel.deleteMany({}),
      YoutubeApiKeyModel.deleteMany({}),
    ];

    await Promise.all(deletePromiseArr);

    const promiseArr = [
      JobModel.insertMany(seedJobData),
      YoutubeApiKeyModel.insertMany(seedYoutubeApiKeys),
    ];

    await Promise.all(promiseArr);
    seedDBLogger.info('Finished seeding DB successfully');

    await dbConn.close();
    seedDBLogger.info('connection closed');
  } catch (err) {
    seedDBLogger.error('DB connection failed :', err.message);
  }
};

seedDb();
