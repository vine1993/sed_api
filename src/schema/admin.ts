import { objectType } from "@nexus/schema";

export const Admin = objectType({
    name: 'Admin',
    definition(t) {
        t.int('id')
        t.string('name')
        t.string('password')
        t.string('email',{ nullable: true })
    }
})
