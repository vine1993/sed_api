import express from 'express';
import {graphqlHTTP} from "express-graphql";
import { schema } from "./schema";
import dotenv from 'dotenv';

const findEnv = () => {
  let file = '.env';
  switch(process.env.NODE_ENV){
    case 'test':
      file = '.env.test';
    break;
    case 'dev':
      file = '.env.local';
      break;
  }
  return file;
}

dotenv.config({path:findEnv()});

const server = express();
server.use('/graphql',graphqlHTTP({
  schema: schema,
  rootValue: () => 'Hello World',
  graphiql: true
}))

export {server};
