import * as http from 'http';
import getPort, {makeRange} from 'get-port';
import {GraphQLClient} from "graphql-request";
import {server} from '../server';

type TestContext = {
    client: GraphQLClient
}

export function createTestContext(): TestContext {
    let ctx = {} as TestContext;
    const graphqlCtx = graphqlTestContext();

    beforeEach(async () => {
        const client = await graphqlCtx.before();
        Object.assign(ctx,{
            client
        })
    })

    afterEach(async () => {
        await graphqlCtx.after();
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
