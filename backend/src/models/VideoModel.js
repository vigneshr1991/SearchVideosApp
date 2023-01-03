const mongoose = require('mongoose');

const { Schema } = mongoose;

const VideoSchema = new Schema({
  videoId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  thumbnails: {
    type: Object,
    required: false,
  },
  channelId: {
    type: String,
    required: false,
  },
  channelTitle: {
    type: String,
    required: false,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
});

VideoSchema.index({ title: 'text', description: 'text' });

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
