import jwt from "jsonwebtoken";
import "dotenv/config";

import logger from "../config/logger.js";
import { UserService } from "../services/index.js";
import hashPassword from "../middlewares/hashPassword.js";
import { UserRolesConst } from "../middlewares/constants.js";
import { isSuccess } from "../middlewares/errorHandler.js";

/**
 * Controller class for handling configuration related requests.
 */
export class AuthController {
    /**
     * Initializes the AuthController with a UserService instance.
     */
    constructor() {
        this.service = new UserService();
    }

    /**
     * Registers a new user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async register(req, res) {
        const { body } = req;
        const encryptedPass = await hashPassword(body.password);
        const userData = {
            login: body.login,
            password: encryptedPass,
            roleId: body.roleId,
            // bossId: (body.bossId === 0 ? NULL : body.bossId),
        };
        const result = await this.service.create(userData);
        return { code: result.code, values: result.values };
    }

    /**
     * Log in a user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async login(req, res) {
        const { body } = req;
        const user = await this.service.selectByLogin(body.login);
        if (!isSuccess(user)) {
            return { code: user.code, values: user.values };
        }

        const password = await hashPassword(body.password);

        if (password !== user.values.password) {
            return { code: 400, values: "Password do not match" };
        }

        const token = jwt.sign(
            {
                userId: user.values.id,
                login: user.values.login,
                roleId: user.values.roleId,
                bossId: user.values.bossId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        );

        const data = {
            userData: {
                userId: user.values.id,
                login: user.values.login,
                roleId: user.values.roleId,
                bossId: user.values.bossId,
            },
            token,
        };
        return { code: 200, values: data };
    }
}

const authController = new AuthController();

export default authController;
