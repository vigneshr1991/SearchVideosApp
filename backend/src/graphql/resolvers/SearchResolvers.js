const SearchService = require('../../services/SearchService');

module.exports = {
  search: async (args) => {
    const { searchQuery, pageNumber, pageLimit } = args;
    const videos = await SearchService.search(searchQuery, pageNumber, pageLimit);
    return videos;
  },
};
