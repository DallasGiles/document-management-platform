const crypto = require('crypto');
const { uploadFile, deleteFile, getObjectSignedUrl } = require('./utils/aws.js');

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { auth } = require('./middleware/auth');

// Multer assists in dealing with multipart/form-data, keeps file in memory without saving file to file system
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload.single('sitePlan'); Middleware function that will be needed to use in conjunction with multer in POST routes


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