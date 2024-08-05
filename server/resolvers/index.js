const userResolvers = require('./userResolvers');
const sitePlanResolvers = require('./sitePlanResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...sitePlanResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...sitePlanResolvers.Mutation,
  },
};

module.exports = resolvers;