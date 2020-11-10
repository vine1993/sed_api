import {createTestContext} from "./__helpers";

const ctx = createTestContext();

describe('Admin', () => {
    it('should get the admin user', async ()=>{
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

        expect(result.Admins).toBe(null);
    })
})
