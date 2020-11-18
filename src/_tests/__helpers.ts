import * as http from 'http';
import {PrismaClient} from '@prisma/client';
import getPort, {makeRange} from 'get-port';
import {GraphQLClient} from "graphql-request";
import {join} from 'path';
import {nanoid} from "nanoid";
import mysql from 'mysql';

import {server} from '../server';
import {Db} from '../db';
import {execSync} from "child_process";

type TestContext = {
    client: GraphQLClient
    db: PrismaClient
}

export function createTestContext(): TestContext {
    let ctx = {} as TestContext;
    const graphqlCtx = graphqlTestContext();
    const prismaCtx = prismaTestContext();

    beforeEach(async () => {
        const client = await graphqlCtx.before();
        const db = await prismaCtx.before();
        Object.assign(ctx,{
            client,
            db
        })
    })

    afterEach(async () => {
        await graphqlCtx.after();
        await prismaCtx.after();
    })

    return ctx;
}

function graphqlTestContext(){
    let serverInstance: http.Server | null = null;
    return {
        before: async function () {
            const port = await getPort({port: makeRange(12000, 16000)});
            const app: Express.Application = server;
            serverInstance = await http.createServer(app).listen(port);
            return new GraphQLClient(`${process.env.DOMAIN}:${port}/graphql`);
        },
        async after(){
            serverInstance?.close();
        }
    }
}

function prismaTestContext(){
    const prismaBinary = join(__dirname,'../../','node_modules','.bin','prisma');
    let schema = '';
    let databaseUrl = '';
    let prismaClient: null | PrismaClient = null;

    return {
        async before(){
            schema = `sed_api_test_${nanoid()}`
            databaseUrl = `mysql://root:root@localhost:3306/${schema}`;
            process.env.DATABASE_URL = databaseUrl;

            execSync(`${prismaBinary} migrate up --create-db --experimental`,{
                env: {
                    ...process.env,
                    DATABASE_URL:databaseUrl
                }
            })
            prismaClient = new PrismaClient();
        },
        async after(){
            const client = await mysql.createConnection(databaseUrl);
            await client.connect();
            await client.query(`DROP SCHEMA IF EXISTS ${'`'+schema+'`'}`)
            await client.end();
            await prismaClient?.$disconnect();
            Db?.$disconnect();
        }
    }
}
