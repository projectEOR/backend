const request = require("supertest");
const app = require("../src/app");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

let bulletID;

describe("Test the '/bullets/?user_id=1' path", () => {
    test("It should respond to the GET method", done => {
        request(app)
            .get("/bullets/?user_id=1")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                expect(JSON.parse(response.text)[1].user_id).toBe(1);
                done();
            });
    });

    test("It should respond to the POST method", done => {
        let req = {}
        request(app)
            .post("/bullets/?user_id=1")
            .send(req)
            .then(response => {
                bulletID = JSON.parse(response.text)[0].id;
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                done();
            });
    }); 
});

describe("Test the '/bullets/##' path", () => {
    test("It should respond to the GET method", done => {
        request(app)
            .get("/bullets/1")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                done();
            });
    });

    test("It should respond to the PUT method", done => {
        let req = {
            user_id: 1,
            report_id: 1,
            content: "Duis consequat dui nec nisi volutpat eleifend.",
            support: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
            editorial_notes: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
        };  
        request(app)
            .put("/bullets/1")
            .send(req)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].report_id).toBe(1);
                done();
            });
    });

    test("It should respond to the DELETE method", done => {
        request(app)
            .delete("/bullets/"+bulletID)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text)[0].user_id).toBe(1);
                done();
            });
    });
});