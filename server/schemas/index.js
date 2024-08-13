import { gql } from 'apollo-server-express';
import { userTypeDefs } from './userSchema.js';
import { sitePlanTypeDefs } from './sitePlanSchema.js';

export const typeDefs = gql`
  type Query
  type Mutation
  ${userTypeDefs}
  ${sitePlanTypeDefs}
`;
