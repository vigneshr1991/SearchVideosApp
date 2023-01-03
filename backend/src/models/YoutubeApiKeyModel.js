const mongoose = require('mongoose');

const { Schema } = mongoose;

const YoutubeApiKeySchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    quotaExceedDate: {
      type: Date,
      required: false,
    },
    lastUsedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const YoutubeApiKey = mongoose.model('YoutubeApiKey', YoutubeApiKeySchema);
module.exports = YoutubeApiKey;
