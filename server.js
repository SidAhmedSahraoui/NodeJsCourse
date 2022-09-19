// GraphQL
/*

const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const connectDB = require("./config/db");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const auth = require("./middleware/auth");
const app = express();

// Connect DB
connectDB();

// Init middleware
app.use(auth);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const code = err.originalError.code || 500;
      const message = err.message || "An error occured.";
      return { message: message, status: code, data: data };
    },
  })
);

app.listen(5000, () => console.log("Server started, port: 5000"));

*/

// Express
const express = require("express");
const bodyParser = require('body-parser')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const path = require('path')
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use("/admin",adminRouter)
app.use("/add" ,userRouter)

app.listen(5000);
