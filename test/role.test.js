import { expect } from "chai";
import request from "supertest";

import app from "../src/app.js";
import { User, Role } from "../src/models/index.js";
import hashPassword from "../src/middlewares/hashPassword.js";

describe("Role routes", () => {
    let token;
    beforeEach((done) => {
        setTimeout(done, 100);
    });

    before(async () => {
        const login = "testlogin";
        const password = "TestPas1!";
        const hashedPassword = await hashPassword(password);
        await User.create({
            login: login,
            password: hashedPassword,
            roleId: 1,
        });
        const inputData = {
            login,
            password,
        };
        const response = await request(app).post("/api/auth/login").send(inputData);
        token = response.body.values.token;
    });

    after(async () => {
        await User.destroy({
            where: {},
            truncate: true,
        });
    });

    describe("GET /api/roles/selectAll", () => {
        it("Success 200", async () => {
            const response = await request(app).get("/api/roles/selectAll").set("token", token);
            expect(response.status).equal(200);
            expect(response.body.values[0].title).equal("ADMIN");
            expect(response.body.values[1].title).equal("BOSS");
            expect(response.body.values[2].title).equal("USER");
        });

        it("Unauthorized user 401", async () => {
            const response = await request(app).get("/api/roles/selectAll");
            expect(response.status).equal(401);
        });
    });

    describe("GET /api/roles/selectById", () => {
        it("Success 200", async () => {
            const inputData = {
                id: 1,
            };
            const response = await request(app).get("/api/roles/selectById").set("token", token).send(inputData);
            expect(response.status).equal(200);
            expect(response.body.values.title).equal("ADMIN");
        });

        it("Unauthorized user 401", async () => {
            const inputData = {
                id: 1,
            };
            const response = await request(app).get("/api/roles/selectById").send(inputData);
            expect(response.status).equal(401);
        });

        it("Role with this id does not exist 404", async () => {
            const inputData = {
                id: 4,
            };
            const response = await request(app).get("/api/roles/selectById").set("token", token).send(inputData);
            expect(response.status).equal(404);
        });
    });
});
