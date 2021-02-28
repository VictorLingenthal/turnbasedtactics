import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { PubSub } from 'apollo-server'

import mongoose from "mongoose"
import { createServer } from "http"
import dotenv from "dotenv"

import { typeDefs } from "./graphql/typeDefs"
import { resolvers } from "./graphql/resolvers"



const pubsub = new PubSub();

dotenv.config();

mongoose
  .connect(
    (process.env.ATLAS_URI)as any,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongodb connected successfully");
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req, res}) => ({req, res, pubsub})
    });
    const app = express();
    app.use(express.static(__dirname + "/frontend/build"))

    server.applyMiddleware({ app });
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer)

    const PORT = process.env.PORT || 4444;
    httpServer.listen({ port: PORT }, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
