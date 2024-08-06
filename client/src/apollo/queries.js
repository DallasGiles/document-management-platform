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

// Mutation to sign up a new user
export const SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!, $role: String!, $organization: String!, $foreman: ID) {
    signUp(username: $username, email: $email, password: $password, role: $role, organization: $organization, foreman: $foreman) {
      id
      username
      email
      role
    }
  }
`;

// Mutation to log in a user
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// Query to fetch all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      role
    }
  }
`;

// Query to fetch users under a specific Foreman
export const GET_USERS_UNDER_FOREMAN = gql`
  query GetUsersUnderForeman($foremanId: ID!) {
    usersUnderForeman(foremanId: $foremanId) {
      id
      username
      email
      role
    }
  }
`;