import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';
// HTTP connection to the API
// const httpLink = createHttpLink({
//   uri: 'http://localhost:5000/graphql',
// });

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    'keepalive': 'true',
    'content-type': 'application/json'
  }
})

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

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;