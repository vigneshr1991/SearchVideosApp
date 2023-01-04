const mongoose = require('mongoose');

const dbURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

const connectDatabase = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = { connectDatabase };
