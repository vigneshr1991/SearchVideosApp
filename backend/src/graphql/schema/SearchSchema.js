const VideoType = `
    type Video {
        videoId: String!
        title: String!
        description: String!
        thumbnail: String!
        channelId: String!
        channelTitle: String!
        publishedAt: DateTime!
    }
`;

const SearchVideos = `
    searchVideos(searchQuery: String, pageNumber: Int, pageLimit: Int): [Video!]!
`;

module.exports = {
  VideoType,
  SearchVideos,
};
