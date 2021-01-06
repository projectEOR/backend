const request = require("supertest");
const app = require("../src/app");
const bodyParser = require("body-parser");
const { test, expect } = require("@jest/globals");
const expectExport = require("expect");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

describe("Test the profiles path", () => {
    test("It gets all orgs", async () => {
        const response = await request(app).get("/profiles/orgs");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("It gets all ranks", async () => {
        const response = await request(app).get("/profiles/ranks");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("It adds a new rank", async () => {
        const setupResponse = await request(app).get("/profiles/ranks");
        const rankNum = setupResponse.body.length;
        const newRank = {
            name: "Emperor",
            symbol: "Emp"
        }

        const postResponse = await request(app).post("/profiles/ranks").send(newRank);
        
        const response = await request(app).get("/profiles/ranks");
        const newRankNum = response.body.length;

        expect(postResponse.statusCode).toBe(201);
        expect(newRankNum-rankNum).toEqual(1);
    });

    test("It deletes a rank", async () => {
        const newRank = {
            name: "Jedi Master",
            symbol: "JM"
        }
        const setupResponse = await request(app).post("/profiles/ranks").send(newRank);
        const newRankId = setupResponse.body.newRankId;

        await request(app).delete(`/profiles/rank/${newRankId}`);

        const response = await request(app).get("/profiles/ranks");
        const newRankIndex = response.body.findIndex(rank => rank.id === newRankId);
        expect(newRankIndex).toBeLessThan(0);
    })
});
