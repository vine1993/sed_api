import {createTestContext} from "./__helpers";
const ctx = createTestContext();

describe('Admin', () => {
    it('should get no admin users', async ()=>{
        const result = await ctx.client.request(`
           query {
            adminList {
                id
                name
                email
                password
            }
           } 
        `)
        expect(result).toMatchObject({adminList:[]});
    })

    it('should create a admin user', async () => {
        const mutation = `
            mutation {
                adminCreation(name:"Vinicius Rangel",password:"123"){
                    id
                }
            }
        `;

        const result = await ctx.client.request(mutation)
        expect(result).toMatchObject({adminCreation:{id:expect.any(Number)}})
    })
})
