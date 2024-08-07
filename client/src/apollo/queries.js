import { gql } from '@apollo/client';

// Query to fetch site plans
export const GET_SITE_PLANS = gql`
  query GetSitePlans {
    sitePlans {
      id
      title
      status
      uploadedBy
      team
    }
  }
`;

// Mutation to approve a site plan
export const APPROVE_PLAN = gql`
  mutation ApprovePlan($planId: ID!) {
    approvePlan(planId: $planId) {
      id
      title
      status
    }
  }
`;