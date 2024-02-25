import { expect } from "chai";
import request from "supertest";

import app from "../src/app.js";
import { User, Role } from "../src/models/index.js";
import hashPassword from "../src/middlewares/hashPassword.js";

describe("User routes", () => {
    beforeEach((done) => {
        setTimeout(done, 100);
    });

    before(async () => {
        const password = "TestPas1!";
        const hashedPassword = await hashPassword(password);
        await User.create({
            login: "admin1",
            password: hashedPassword,
            roleId: 1,
        });
        await User.create({
            login: "boss1",
            password: hashedPassword,
            roleId: 2,
            bossId: 1,
        });
        await User.create({
            login: "user1",
            password: hashedPassword,
            roleId: 3,
            bossId: 2,
        });
        await User.create({
            login: "user2",
            password: hashedPassword,
            roleId: 3,
            bossId: 2,
        });
        await User.create({
            login: "boss2",
            password: hashedPassword,
            roleId: 2,
            bossId: 1,
        });
        await User.create({
            login: "boss3",
            password: hashedPassword,
            roleId: 2,
            bossId: 5,
        });
        await User.create({
            login: "boss4",
            password: hashedPassword,
            roleId: 2,
            bossId: 5,
        });
        await User.create({
            login: "user3",
            password: hashedPassword,
            roleId: 3,
            bossId: 6,
        });
        await User.create({
            login: "user4",
            password: hashedPassword,
            roleId: 3,
            bossId: 6,
        });
        await User.create({
            login: "user5",
            password: hashedPassword,
            roleId: 3,
            bossId: 7,
        });
    });

    after(async () => {
        await User.destroy({
            where: {},
            truncate: true,
        });
    });

    describe("GET /api/users/selectAll", () => {
        it("Success Admin 200", async () => {
            const inputData = {
                login: "admin1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const response1 = await request(app).get("/api/users/selectAll").set("token", token);
            expect(response1.status).equal(200);
            expect(response1.body.values.length).equal(10);
        });

        it("Success Boss 200", async () => {
            const inputData = {
                login: "boss1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const response1 = await request(app).get("/api/users/selectAll").set("token", token);
            expect(response1.status).equal(200);
            expect(response1.body.values.length).equal(3);
        });

        it("Success User 200", async () => {
            const inputData = {
                login: "user1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const response1 = await request(app).get("/api/users/selectAll").set("token", token);
            expect(response1.status).equal(200);
            expect(response1.body.values.login).equal("user1");
        });

        it("Unauthorized user 401", async () => {
            const response = await request(app).get("/api/users/selectAll");
            expect(response.status).equal(401);
        });
    });

    describe("GET /api/users/selectById", () => {
        it("Success 200", async () => {
            const inputData = {
                login: "admin1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const inputData1 = {
                userId: 2,
            };
            const response1 = await request(app).get("/api/users/selectById").set("token", token).send(inputData1);
            expect(response1.status).equal(200);
            expect(response1.body.values.login).equal("boss1");
        });

        it("Unauthorized user 401", async () => {
            const inputData = {
                id: 1,
            };
            const response = await request(app).get("/api/users/selectById").send(inputData);
            expect(response.status).equal(401);
        });

        it("User is not your subordinate 403", async () => {
            const inputData = {
                login: "boss1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const inputData1 = {
                userId: 5,
            };
            const response1 = await request(app).get("/api/users/selectById").set("token", token).send(inputData1);
            expect(response1.status).equal(403);
        });

        it("User with this ID does not exist 404", async () => {
            const inputData = {
                login: "admin1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const inputData1 = {
                userId: 11,
            };
            const response1 = await request(app).get("/api/users/selectById").set("token", token).send(inputData1);
            expect(response1.status).equal(404);
        });
    });

    describe("PATCH /api/users/changeBoss", () => {
        it("Success 200", async () => {
            const inputData = {
                login: "admin1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const inputData1 = {
                userId: 8,
                bossId: 7,
            };
            const response1 = await request(app).patch("/api/users/changeBoss").set("token", token).send(inputData1);
            expect(response1.status).equal(200);
        });

        it("Unauthorized user 401", async () => {
            const inputData = {
                userId: 2,
                bossId: 1,
            };
            const response = await request(app).patch("/api/users/changeBoss").send(inputData);
            expect(response.status).equal(401);
        });

        it("User is not your subordinate 403", async () => {
            const inputData = {
                login: "boss3",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const inputData1 = {
                userId: 8,
                bossId: 6,
            };
            const response1 = await request(app).patch("/api/users/changeBoss").set("token", token).send(inputData1);
            expect(response1.status).equal(403);
        });

        it("User with this ID does not exist 404", async () => {
            const inputData = {
                login: "admin1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const inputData1 = {
                userId: 11,
                bossId: 2,
            };
            const response1 = await request(app).patch("/api/users/changeBoss").set("token", token).send(inputData1);
            expect(response1.status).equal(404);
        });

        it("Boss with this ID does not exist 404", async () => {
            const inputData = {
                login: "admin1",
                password: "TestPas1!",
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            const { token } = response.body.values;

            const inputData1 = {
                userId: 2,
                bossId: 11,
            };
            const response1 = await request(app).patch("/api/users/changeBoss").set("token", token).send(inputData1);
            expect(response1.status).equal(404);
        });
    });
});
