import "dotenv/config";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./database";
import { typeDefs, resolvers } from "./graphql";

const port: string | number = process.env.PORT || 4000;

const mount = async (app: Application) => {
  const db = await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

mount(express());
