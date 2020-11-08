import { makeSchema } from "@nexus/schema";
import { join } from 'path';

export const schema = makeSchema({
    types: [],
    outputs: {
        typegen: join(__dirname,'../../','.nexus/nexus-typegen.ts'),
        schema: join(__dirname,'../../','.nexus/schema.graphql')
    }
})
