const Video = require('../models/VideoModel');

const logger = require('../utils/logger');

const searchServiceLogger = logger.getLogger('search-service');

const getNextPageTimeStamp = (videos, pageLimit, pageDirection) => {
  if (!videos.length || videos.length < pageLimit) {
    return null;
  }

  return pageDirection ? videos[videos.length - 1].publishedAt : videos[0].publishedAt;
};

const search = async (searchQuery, lastPageTS, pageLimit = 10, sortBy = '-publishedAt', pageDirection = 1) => {
  searchServiceLogger.info('calling search service');
  try {
    let where = {};

    let publishedAtConstraint;
    let searchConstraint;

    if (lastPageTS) {
      if (pageDirection > 0) {
        publishedAtConstraint = { publishedAt: { $lt: new Date(lastPageTS) } };
      } else {
        publishedAtConstraint = { publishedAt: { $gt: new Date(lastPageTS) } };
      }
    }

    if (searchQuery) {
      searchConstraint = { $text: { $search: searchQuery } };
    }

    if (searchConstraint && publishedAtConstraint) {
      where = {
        $and: [
          publishedAtConstraint,
          searchConstraint,
        ],
      };
    } else if (publishedAtConstraint) {
      where = publishedAtConstraint;
    } else if (searchConstraint) {
      where = searchConstraint;
    }

    const videos = await Video.find(where).sort(sortBy).limit(pageLimit);

    return {
      message: 'SUCCESS',
      size: videos.length,
      nextPageTS: getNextPageTimeStamp(videos, pageLimit, true),
      prevPageTS: getNextPageTimeStamp(videos, pageLimit, false),
      data: videos,
    };
  } catch (e) {
    searchServiceLogger.error('Error in GET search service :', e.message);
    throw new Error(e.message);
  }
};

module.exports = {
  search,
};
