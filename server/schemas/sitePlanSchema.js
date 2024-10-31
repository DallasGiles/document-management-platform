import { gql } from 'apollo-server-express';
// TODO: Make sure schema aligns with AWS S3 values
export const sitePlanTypeDefs = gql`
  scalar Upload

  type SitePlan {
    id: ID!
    title: String!
    content: String!
    url: String!
    status: String!
    uploadedBy: String!
    team: String!
  }

  extend type Query {
    sitePlans: [SitePlan]
    sitePlan(id: ID!): SitePlan
  }

  extend type Mutation {
    uploadPlan(file: Upload!): SitePlan!
    submitForApproval(planId: ID!): SitePlan
    approvePlan(planId: ID!): SitePlan
  }
`;