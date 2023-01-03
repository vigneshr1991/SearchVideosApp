const FetchYoutubeVideosProducerJob = require('./FetchYoutubeVideosProducerJob');
const FetchYoutubeVideosConsumerJob = require('./FetchYoutubeVideosConsumerJob');

const startAllJobs = () => {
  FetchYoutubeVideosProducerJob.start();
  FetchYoutubeVideosConsumerJob();
};

const stopAllJobs = () => {
  FetchYoutubeVideosProducerJob.stop();
};

module.exports = {
  startAllJobs,
  stopAllJobs,
};
