import { objectType,extendType } from "@nexus/schema";
import {query} from "express";

export const Admin = objectType({
    name: 'Admin',
    definition(t) {
        t.int('id')
        t.string('name')
        t.string('password')
        t.string('email',{ nullable: true })
    }
})

export const AdminQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('Admins',{
            nullable:true,
            type:'Admin',
            list:true
        })
    }
})
