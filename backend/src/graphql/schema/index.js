const { buildSchema } = require('graphql');

const SearchSchema = require('./SearchSchema');

module.exports = buildSchema(`
    scalar DateTime
    ${SearchSchema.VideoType}
    
    type RootQuery {
        ${SearchSchema.SearchVideos}
    }

    schema {
        query: RootQuery
    }
`);
