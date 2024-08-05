import { gql } from '@apollo/client';

// Example query to fetch site plans
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

// Example mutation to upload a site plan
export const UPLOAD_PLAN = gql`
  mutation UploadPlan($title: String!, $content: String!) {
    uploadPlan(title: $title, content: $content) {
      id
      title
      status
      uploadedBy
      team
    }
  }
`;