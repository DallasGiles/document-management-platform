const { gql } = require('apollo-server-express');

const sitePlanTypeDefs = gql`
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
    uploadPlan(title: String!, content: String!): SitePlan
    submitForApproval(planId: ID!): SitePlan
    approvePlan(planId: ID!): SitePlan
  }
`;

module.exports = sitePlanTypeDefs;