import { makeSchema, connectionPlugin,scalarType } from "@nexus/schema";
import { join } from 'path';
import * as typeDefs from './schemas';

const uuidType  =() => scalarType({
    name: 'UUID',
    serialize: value => value
})

export const schema = makeSchema({
    types: [typeDefs,uuidType],
    outputs: {
        typegen: join(__dirname,'../','.nexus/nexus-typegen.ts'),
        schema: join(__dirname,'../','.nexus/schema.graphql')
    },
    typegenAutoConfig: {
        sources: [
            {
                source: require.resolve('./context'),
                alias: 'ContextModule'
            }
        ],
        contextType: 'ContextModule.Context'
    },
    plugins: [
        connectionPlugin({
            includeNodesField: true,
        })
    ]
})
