const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
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
    signUp(username: String!, email: String!, password: String!, role: String!): User
    login(email: String!, password: String!): String
  }
`;

module.exports = userTypeDefs;