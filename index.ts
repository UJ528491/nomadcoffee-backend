require("dotenv").config();
const { ApolloServer } = require("apollo-server");
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/utils/users.getUser";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any) => {
    console.log(req.headers);

    const token = await req.headers.authorization;
    const loggedInUser = await getUser(token);
    return { loggedInUser };
  },
});

// The `listen` method launches a web server.
const PORT = process.env.PORT;
server.listen().then(() => {
  console.log(`🚀  Server ready at "http://localhost:${PORT}"`);
});
