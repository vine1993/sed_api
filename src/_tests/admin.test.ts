import {createTestContext} from "./__helpers";

const ctx = createTestContext();

describe('Admin', () => {
    it('should get no admin users', async ()=>{
        const result = await ctx.client.request(`
           query {
            Admins {
                id
                name
                email
                password
            }
           } 
        `)
        expect(result.Admins).toEqual(expect.arrayContaining([]));
    })

    it('should create a admin user', async () => {
        const result = await ctx.client.request(`
            mutation {
                AdminCreate(name:"Vinicius Rangel",password:"123"){
                    id
                }
            }
        `)

        expect(result.AdminCreate.id).toBe(1);
    })
})
