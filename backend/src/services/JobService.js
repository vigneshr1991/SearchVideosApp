const JobModel = require('../models/JobModel');
const logger = require('../utils/logger');

const jobServiceLogger = logger.getLogger('job-service');

const getByJobKey = async (jobKey) => {
  jobServiceLogger.info('calling getByJobKey job service');
  try {
    const job = await JobModel.findOne({ jobKey }).exec();
    return job;
  } catch (err) {
    jobServiceLogger.error('getByJobKey error :', err.message);
    throw new Error(err.message);
  }
};

const updateJob = async (findConstraint, updateData) => {
  jobServiceLogger.info('calling updateJob job service');
  try {
    const job = await JobModel.findOneAndUpdate(findConstraint, { $set: updateData });
    return job;
  } catch (err) {
    jobServiceLogger.error('getByJobKey error :', err.message);
    throw new Error(err.message);
  }
};

module.exports = {
  getByJobKey,
  updateJob,
};
