const { it, expect } = require("@jest/globals");
const request = require("supertest");
const api = require("../../routes/api");


describe('wishlist', () => {
    // it('should return 200 OK when add wishlist item', async() => {
    //     let id = JSON.stringify({ id: 2 });
    //     let result = await (request(api).post("/add-wishlist").send(id))

    //     expect(result.status).toBe(200);
    // });

    it("should return wishlit items", async() => {
        let result = await request(api).get('/wishlist');

        expect(result.status).toBe(200);
    })
})