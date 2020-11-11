import {objectType, extendType, stringArg} from "@nexus/schema";
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
            list:true,
            resolve(_root,_args,ctx){
                return [];
            }
        })
    }
})

export const AdminMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('AdminCreate',{
            type: 'Admin',
            nullable:false,
            args: {
              name: stringArg({required:true}),
              password: stringArg({required:true})
            },
            resolve(_root,args,ctx){
                return {id:1};
            }
        })
    }
})

