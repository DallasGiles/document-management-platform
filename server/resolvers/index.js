import { userResolvers } from './userResolvers.js';
import { sitePlanResolvers } from './sitePlanResolvers.js';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...sitePlanResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...sitePlanResolvers.Mutation,
  },
};