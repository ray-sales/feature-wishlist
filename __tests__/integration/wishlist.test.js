const { it, expect } = require("@jest/globals");
const request = require('supertest');
const app = require("../../app");


describe('wishlist', () => {
    let id = { id: 2 };
    it('should return 200 OK when add wishlist item', async() => {
        let result = await request(app).post("/api/add-wishlist").send(id)
        console.log("## cookies");
        console.log(result.headers)
        expect(result.status).toBe(201);
    });

    it("should return 200 and array items", async() => {
        let result = await request(app).get("/api/wishlist");
        expect(result.status).toBe(200);
    })

    it("should return 200 and user city", async() => {
        let result = await request(app).get('/api/get-city').query({ lat: '-23.1324035', long: '-47.0794271' });
        expect(result.body).toHaveProperty("town");
        expect(result.status).toBe(200);
    })

    it("should return status 200 and remove id of favorites", async() => {
        let result = await request(app).delete('/api/remove-wishlist/' + id.id);

    })
})