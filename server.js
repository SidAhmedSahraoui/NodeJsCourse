const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true
    })
  );


  mongoose
  .connect(
    'mongodb://localhost:27017/soc'
  )
  .then(result => {
    app.listen(8000);
  })
  .catch(err => console.log(err));