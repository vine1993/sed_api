import express from 'express';
import {graphqlHTTP} from "express-graphql";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import { schema } from "./schema";
import {Db} from './db';

let envPath = path.resolve(__dirname,`../.env.${process.env.NODE_ENV}`)
if(!fs.existsSync(envPath)) envPath = '../.env'

dotenv.config({path:envPath});

const server = express();
server.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true,
  context: {db:Db}
}))

export {server};
