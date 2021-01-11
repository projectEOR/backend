const request = require("supertest");
const app = require("../src/app");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
let reportID;


describe("Test the '/reports/?user_id=1' path", () => {
    test("It should respond to the GET method", done => {
        request(app)
            .get("/reports/?user_id=1")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                expect(JSON.parse(response.text)[1].user_id).toBe(1);
                done();
            });
    });


    test("It should respond to the POST method", done => {
        let req = {pr_type: 0}
        request(app)
            .post("/reports/?user_id=1")
            .send(req)
            .then(response => {
                reportID = JSON.parse(response.text)[0].id;
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                done();
            });
    }); 
});

describe("Test the '/reports/##' path", () => {
    test("It should respond to the GET method", done => {
        request(app)
            .get("/reports/1")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                done();
            });
    });

    test("It should respond to the PUT method", done => {
        let req = {
            user_id: 1,
            pr_type: 1,
            afsc: "24K3F",
            org_id: 2,
            job_desc: "Research Associate",
            period_start: "2020-05-10 09:55:10",
            period_end: "2021-05-09 09:55:10 UTC",
            sup_days: 360,
            non_rated_days: 40,
            last_feedback: "2020-11-08 09:55:10 UTC",
            rater_id: 3,
            addl_rater_id: 3,
            reviewer_id: 5,
            func_id: 2,
            remarks: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            referral_report: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
            pfactors: [
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ]
        };  
        request(app)
            .put("/reports/1")
            .send(req)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                done();
            });
    });

    test("It should respond to the DELETE method", done => {
        request(app)
            .delete("/reports/"+reportID)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                done();
            });
    });
});