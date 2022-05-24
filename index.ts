require("dotenv").config();
const { ApolloServer } = require("apollo-server");
import { typeDefs, resolvers } from "./schema";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The `listen` method launches a web server.
const PORT = process.env.PORT;
server.listen().then(() => {
  console.log(`🚀  Server ready at "http://localhost:${PORT}"`);
});
