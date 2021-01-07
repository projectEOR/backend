const request = require("supertest");
const app = require("../src/app");
const { test, expect } = require("@jest/globals");
const expectExport = require("expect");


describe("Test the overview path", () => {
    test("It gets all members of an org", async () => {
        const response = await request(app).get("/overview/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("It gets all children of an org", async () => {
        const response = await request(app).get("/overview/children/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});