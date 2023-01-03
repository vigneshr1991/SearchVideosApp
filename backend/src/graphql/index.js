const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./schema');
const graphqlResolvers = require('./resolvers');

module.exports = graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true, // this creates the interactive GraphQL API explorer with documentation.
  customFormatErrorFn(err) {
    if (!err.originalError) {
      return err;
    }

    const { data } = err.originalError;
    const message = err.message || 'something went wrong';
    const status = err.originalError.code || 500;
    return { data, message, status };
  },
});
