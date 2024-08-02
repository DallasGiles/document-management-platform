const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userSchema');
const sitePlanTypeDefs = require('./sitePlanSchema');

const typeDefs = gql`
  type Query
  type Mutation
  ${userTypeDefs}
  ${sitePlanTypeDefs}
`;

module.exports = typeDefs;