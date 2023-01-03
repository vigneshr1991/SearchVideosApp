const SearchService = require('../services/SearchService');

const logger = require('../utils/logger');

const serachControllerLogger = logger.getLogger('search-controller');

const search = async (req, res) => {
  serachControllerLogger.info('calling search service');
  try {
    const {
      searchQuery, lastPageTS, pageLimit, sortBy, pageDirection,
    } = req.query;
    const searchResults = await SearchService.search(
      searchQuery,
      lastPageTS,
      pageLimit,
      sortBy,
      pageDirection,
    );
    return res.status(200).json(searchResults);
  } catch (e) {
    serachControllerLogger.error('Error in GET search api :', e);
    return res.status(500).json(e.message);
  }
};

module.exports = {
  search,
};
