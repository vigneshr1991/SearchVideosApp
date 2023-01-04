const axios = require('axios');

const apiUrl = process.env.YOUTUBE_API_URL;

const Video = require('../models/VideoModel');
const YoutubeApiKey = require('../models/YoutubeApiKeyModel');

const logger = require('../utils/logger');

const videoServiceLogger = logger.getLogger('video-service');

const fetchYoutubeVideos = async (searchQuery, resultsPerPage = 20, pageToken = '') => {
  videoServiceLogger.info('calling fetchYoutubeVideos service');
  let youtubeApiKey;
  try {
    // get youtube key(least used)
    youtubeApiKey = await YoutubeApiKey.findOne({
      quotaExceedDate: { $lte: new Date(new Date() - (24 * 60 * 60 * 1000)) },
    }).sort('lastUsedAt').exec();

    if (!youtubeApiKey) {
      return {
        nextPageToken: null,
        videos: [],
      };
    }

    const { apiKey } = youtubeApiKey;

    let url = `${apiUrl}/search?key=${apiKey}&order=date&type=video&part=snippet&q=${searchQuery}`;

    if (resultsPerPage) {
      url = `${url}&maxResults=${resultsPerPage}`;
    }

    if (pageToken) {
      url = `${url}&pageToken=${pageToken}`;
    }

    // call youtube api
    const response = await axios.get(url);
    const { nextPageToken, items } = response.data;

    const videos = items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));

    // update last key used date
    /* eslint no-underscore-dangle: 0 */
    await YoutubeApiKey.findByIdAndUpdate(youtubeApiKey._id, { lastUsedAt: new Date() });

    return { nextPageToken, videos };
  } catch (err) {
    videoServiceLogger.error('error in fetchYoutubeVideos :', err.message);
    if (err.response) {
      console.log(err.response.status);
      console.log(err.message);
      console.log(err.response.headers); // 👉️ {... response headers here}
      console.log(err.response.data); // 👉️ {... response data here}

      if (err.response.status === 403) {
        videoServiceLogger.error('quota exceeded');
        // update last key used and quota exceeded date
        /* eslint no-underscore-dangle: 0 */
        if (youtubeApiKey) {
          await YoutubeApiKey.findByIdAndUpdate(youtubeApiKey._id, {
            quotaExceedDate: new Date(),
            lastUsedAt: new Date(),
          });
        }
      }
    }
    throw new Error(err.message);
  }
};

const insertManyVideos = async (videos) => {
  videoServiceLogger.info('called insertManyVideos service');
  try {
    return await Video.insertMany(videos);
  } catch (err) {
    videoServiceLogger.error('error in insertManyVideos :', err);
    throw new Error(err.message);
  }
};

const upsertManyVideos = async (videos) => {
  videoServiceLogger.info('called upsertManyVideos service');
  try {
    return await Video.bulkWrite(
      videos.map((video) => ({
        updateOne: {
          filter: { videoId: video.videoId },
          update: video,
          upsert: true,
        },
      })),
    );
  } catch (err) {
    videoServiceLogger.error('error in upsertManyVideos :', err);
    throw new Error(err.message);
  }
};

module.exports = {
  fetchYoutubeVideos,
  insertManyVideos,
  upsertManyVideos,
};
