import express from 'express';
import {graphqlHTTP} from "express-graphql";
import { schema } from "./schema/schema";

const server = express();
server.use('/graphql',graphqlHTTP({
  schema: schema,
  rootValue: () => 'Hello World',
  graphiql: true
}))

export {server};
