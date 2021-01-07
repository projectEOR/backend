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

        const deleteResponse = await request(app).delete(`/profiles/rank/${newRankId}`);

        const response = await request(app).get("/profiles/ranks");
        const newRankIndex = response.body.findIndex(rank => rank.id === newRankId);
        expect(deleteResponse.statusCode).toBe(204);
        expect(newRankIndex).toBeLessThan(0);
    })

    test("It gets all users", async () => {
        const response = await request(app).get("/profiles");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("It posts a user", async () => {
        const newUser = {
            email: "test",
            first_name: "user2748591",
            last_name: "test",
            rank_id: 1,
            org_id: 1,
            rater_id: 1,
            additional_rater_id: 1,
            closeout: "2021-01-01"
        };

        const postResponse = await request(app).post("/profiles").send(newUser);

        const response = await request(app).get("/profiles");
        const newUserIndex = response.body.findIndex(user => user.id === postResponse.body.newUserId);
        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body.newUserId).toBeDefined();
        expect(newUserIndex).toBeGreaterThanOrEqual(0);
    });

    test("It gets a user", async () => {
        const newUser = {
            email: "test",
            first_name: "test-user",
            last_name: "test",
            rank_id: 1,
            org_id: 1,
            rater_id: 1,
            additional_rater_id: 1,
            closeout: "2021-01-01"
        };
        const postResponse = await request(app).post('/profiles').send(newUser);
        const newUserId = postResponse.body.newUserId;

        const response = await request(app).get(`/profiles/user/${newUserId}`);
        const receivedUser = response.body;
    
        expect(response.statusCode).toBe(200);
        expect(receivedUser.first_name).toBe('test-user');
    });

    test("It updates a user", async () => {
        const newUser = {
            email: "test",
            first_name: "test-user",
            last_name: "test",
            rank_id: 1,
            org_id: 1,
            rater_id: 1,
            additional_rater_id: 1,
            closeout: "2021-01-01"
        };
        const postResponse = await request(app).post('/profiles').send(newUser);
        const newUserId = postResponse.body.newUserId;
        const userUpdate = {
            first_name: "user-test"
        }

        const putResponse = await request(app).put(`/profiles/user/${newUserId}`).send(userUpdate);
        const updatedUser = putResponse.body;

        expect(putResponse.statusCode).toBe(201);
        expect(updatedUser.first_name).toBe('user-test');
    });

    test("It deletes a user", async () => {
        const newUser = {
            email: "test",
            first_name: "test-user",
            last_name: "test",
            rank_id: 1,
            org_id: 1,
            rater_id: 1,
            additional_rater_id: 1,
            closeout: "2021-01-01"
        };
        const postResponse = await request(app).post('/profiles').send(newUser);
        const newUserId = postResponse.body.newUserId;

        const deleteResponse = await request(app).delete(`/profiles/user/${newUserId}`);

        const response = await request(app).get(`/profiles/user/${newUserId}`);
        expect(deleteResponse.statusCode).toBe(204);
        expect(Object.keys(response.body).length).toBe(0);
    })
});
