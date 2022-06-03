require("dotenv").config();
import express from "express";
import http from "http";
import logger from "morgan";
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { ApolloServer } = require("apollo-server-express");
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/utils/users.getUser";

const app = express();
app.use(logger("tiny"));
app.use(graphqlUploadExpress());
const httpServer = http.createServer(app);
async function startServer() {
  const server = new ApolloServer({
    uploads: false,
    typeDefs,
    resolvers,
    // csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: async (req: express.Request) => {
      const token = await req.headers.authorization;
      const loggedInUser = await getUser(token);
      return { loggedInUser };
    },
  });
  await server.start();
  // This middleware should be added before calling `applyMiddleware`.
  server.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));

  const PORT = process.env.PORT;

  await new Promise((resolve: any) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}
startServer();
