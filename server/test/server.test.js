const app = require('../server');
const testServer = require ('supertest');

describe('Test the root path', ()=>{
test ('It should respond 200 to the logout route', async ()=> {
    const response = await testServer(app).post('/api/user/logout');
    expect(response.statusCode).toBe(200);
    
});// in TDD test >> npm test or yarn test , it uses, describe , to console log kinda

});

