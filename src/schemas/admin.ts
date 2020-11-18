import {objectType, extendType, stringArg} from "@nexus/schema";

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
        t.field('adminList',{
            nullable:true,
            type:'Admin',
            list:true,
            async resolve(_root,args,ctx){
                return await ctx.db.admin.findMany();
            }
        })
    }
})

export const AdminMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('adminCreation',{
            type: 'Admin',
            nullable:false,
            args: {
                name: stringArg({required:true}),
                password: stringArg({required:true})
            },
            async resolve(_root,args,ctx){
                const Admin = await ctx.db.admin.create({data:args});
                return {id:Admin.id};
            }
        })
    }
})

