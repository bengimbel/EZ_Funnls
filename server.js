// I will create backend with graphQL after I do front end requirements.
// Usually I would do server setup first, but the requirements are for the front end to use local storage.
// Once front end is finished, I will implement the backend server with local storage code commented out.
const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://bengimbel:bengimbel123@ds137255.mlab.com:37255/ez-funnls"
);
mongoose.connection.once("open", () => {
  console.log("connected to EZ-Funnls database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("server is on");
});
