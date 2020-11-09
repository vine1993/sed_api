import { makeSchema } from "@nexus/schema";
import { join } from 'path';

import * as typeDefs from './schema';


export const schema = makeSchema({
    types: typeDefs,
    outputs: {
        typegen: join(__dirname,'../../','.nexus/nexus-typegen.ts'),
        schema: join(__dirname,'../../','.nexus/schema.graphql')
    }
})
