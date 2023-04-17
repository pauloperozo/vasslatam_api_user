/////////////////////////////////////////////////////////////
const supertest = require('supertest')
const app = require('../build/app')
const request = supertest(app)
/////////////////////////////////////////////////////////////
describe("Servidor Activo",() => {

    describe("GET /", () =>{
        it("Succces", async () => {
            const response = await request.get("/api").send()
            expect(response.status).toBe(200)
        })
    })

})
/////////////////////////////////////////////////////////////