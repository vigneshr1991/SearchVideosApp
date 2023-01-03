const mongoose = require('mongoose');

const { Schema } = mongoose;
const { v4: generateId } = require('uuid');

const JobSchema = new Schema(
  {
    id: {
      type: String,
      default: generateId,
    },
    jobName: {
      type: String,
      required: true,
    },
    jobKey: {
      type: String,
      required: true,
    },
    cronRegex: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      required: false,
    },
    lastRunAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
