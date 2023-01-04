const config = {
  mongoURL: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
  rabbitURL: `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  searchQueue: process.env.SEARCH_QUERY_QUEUE,
  youtubeApiUrl: process.env.YOUTUBE_API_URL,
};

module.exports = config;
