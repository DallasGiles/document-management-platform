const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schemas');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/document-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});