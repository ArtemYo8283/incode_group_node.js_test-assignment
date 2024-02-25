import { expect } from "chai";
import request from "supertest";

import app from "../src/app.js";
import { User, Role } from "../src/models/index.js";
import hashPassword from "../src/middlewares/hashPassword.js";

describe("Auth routes", () => {
    beforeEach((done) => {
        setTimeout(done, 100);
    });

    describe("POST /api/auth/register", () => {
        it("Success 200", async () => {
            const login = "testlogin";
            const password = "TestPas1!";
            const inputData = {
                login,
                password,
                confirmPassword: password,
                roleId: "1",
                bossId: "0",
            };
            const response = await request(app).post("/api/auth/register").send(inputData);
            console.log(response._body);
            expect(response.status).equal(200);
            const userUpd = await User.findOne({ login: login });
            expect(userUpd).to.not.be.null;
            await User.destroy({
                where: {},
                truncate: true,
            });
        });

        it("Boss id can't be 0 if you aren't Admin 400", async () => {
            const login = "testlogin";
            const password = "TestPas1!";
            const inputData = {
                login,
                password,
                confirmPassword: password,
                roleId: "2",
                bossId: "0",
            };
            const response = await request(app).post("/api/auth/register").send(inputData);
            expect(response.status).equal(400);
            const userUpd = await User.findOne({ login: login });
            expect(userUpd).to.be.null;
            await User.destroy({
                where: {},
                truncate: true,
            });
        });

        it("Role with this id not exist 404", async () => {
            const login = "testlogin";
            const password = "TestPas1!";
            const inputData = {
                login,
                password,
                confirmPassword: password,
                roleId: "4",
                bossId: "0",
            };
            const response = await request(app).post("/api/auth/register").send(inputData);
            expect(response.status).equal(404);
            const userUpd = await User.findOne({ login: login });
            expect(userUpd).to.be.null;
            await User.destroy({
                where: {},
                truncate: true,
            });
        });

        it("User boss with this id not exist 404", async () => {
            const login = "testlogin";
            const password = "TestPas1!";
            const inputData = {
                login,
                password,
                confirmPassword: password,
                roleId: "3",
                bossId: "1",
            };
            const response = await request(app).post("/api/auth/register").send(inputData);
            expect(response.status).equal(404);
            const userUpd = await User.findOne({ login: login });
            expect(userUpd).to.be.null;
            await User.destroy({
                where: {},
                truncate: true,
            });
        });

        it("User with this login already exists 409", async () => {
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
                confirmPassword: password,
                roleId: "1",
                bossId: "0",
            };
            const response = await request(app).post("/api/auth/register").send(inputData);
            expect(response.status).equal(409);
            const userUpd = await User.findOne({ login: login });
            expect(userUpd).to.not.be.null;
            await User.destroy({
                where: {},
                truncate: true,
            });
        });
    });

    describe("POST /api/auth/login", () => {
        it("Success 200", async () => {
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
            expect(response.status).equal(200);
            expect(response._body.values.userData.login).equal(login);
            await User.destroy({
                where: {},
                truncate: true,
            });
        });

        it("Password do not match 400", async () => {
            const login = "testlogin";
            const password1 = "TestPas1!";
            const password2 = "TestPas2!";
            const hashedPassword = await hashPassword(password1);
            await User.create({
                login: login,
                password: hashedPassword,
                roleId: 1,
            });
            const inputData = {
                login,
                password: password2,
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            expect(response.status).equal(400);
            await User.destroy({
                where: {},
                truncate: true,
            });
        });

        it("User with this login not exist 404", async () => {
            const login = "testlogin";
            const password = "TestPas1!";
            const inputData = {
                login,
                password,
            };
            const response = await request(app).post("/api/auth/login").send(inputData);
            expect(response.status).equal(404);
            const userUpd = await User.findOne({ login: login });
            expect(userUpd).to.be.null;
            await User.destroy({
                where: {},
                truncate: true,
            });
        });
    });
});
