const request = require("supertest");
const app = require("../src/app");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);



describe("Test the reports path", () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/reports/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe("");
                done();

            });
    });
});