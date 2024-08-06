const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { auth } = require('./middleware/auth');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware for authentication
app.use(auth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  }),
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}${server.graphqlPath}`);
});