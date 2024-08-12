const { gql } = require('apollo-server-express');

const sitePlanTypeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type SitePlan {
    id: ID!
    title: String!
    content: String!
    status: String!
    uploadedBy: String!
    team: String!
  }

  extend type Query {
    sitePlans: [SitePlan]
    sitePlan(id: ID!): SitePlan
  }

  extend type Mutation {
    uploadPlan(file: Upload!): File!
    submitForApproval(planId: ID!): SitePlan
    approvePlan(planId: ID!): SitePlan
  }
`;

module.exports = sitePlanTypeDefs;