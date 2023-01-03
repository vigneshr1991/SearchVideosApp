const mongoose = require('mongoose');

const dbURI = `${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;

const connectDatabase = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = { connectDatabase };
