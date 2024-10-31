import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';

// Use environment variable for dynamic URI, with a fallback for production
const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_BACKEND_URI || 'https://construct-comm.onrender.com/graphql',
  headers: {
    'keepalive': 'true',
    'content-type': 'application/json',
  },
});

// Auth middleware to attach JWT token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client with auth and upload links
const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;