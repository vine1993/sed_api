import express from 'express';
import {graphqlHTTP} from "express-graphql";
import { index } from "./schema/schema";

const server = express();
server.use('/graphql',graphqlHTTP({
  schema: index,
  rootValue: () => 'Hello World',
  graphiql: true
}))

export {server};
