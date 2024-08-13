import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { connectDB } from './config/db.js';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js';
import { auth } from './middleware/auth.js';

import multer from 'multer';

// Multer assists in dealing with multipart/form-data, keeps file in memory without saving file to file system
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload.single('sitePlan'); Middleware function that will be needed to use in conjunction with multer in POST routes


// Load environment variables from .env file
config();

// Connect to the database
connectDB();

async function startApolloServer() {
  const app = express();
  
  // Middleware for authentication
  // TODO: enable auth again once it doesn't apply to login and signup mutations
  app.use(graphqlUploadExpress());
  app.use(auth);
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user,
    }),
  });
  
  await server.start();
  
  server.applyMiddleware({ app });
  
  const PORT = process.env.PORT || 5000;
  
  await new Promise(resolve => app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}${server.graphqlPath}`);
    resolve();
  }));

  return { server, app };
}

startApolloServer();