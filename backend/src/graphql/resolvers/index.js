const { GraphQLDateTime } = require('graphql-iso-date');

const SearchResolvers = require('./SearchResolvers');

module.exports = {
  DateTime: GraphQLDateTime,
  ...SearchResolvers,
};
