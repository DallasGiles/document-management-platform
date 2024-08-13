import { gql } from 'apollo-server-express';

// TODO: add foreman to User type and to signup mutation
// TODO: add organization to User type
export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!, role: String!, organization: String!): User
    login(email: String!, password: String!): String
  }
`;