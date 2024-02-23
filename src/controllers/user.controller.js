import jwt from "jsonwebtoken";

import logger from "../config/logger.js";
import { UserService } from "../services/index.js";

/**
 * Controller class for handling configuration related requests.
 */
export class UserController {
    /**
     * Initializes the UserController with a UserService instance.
     */
    constructor() {
        this.service = new UserService();
    }

    /**
     * Retrieves all users.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const { token } = req.headers;
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        let result;
        if (userData.roleId === 3) {
            result = await this.service.selectById(userData.userId);
        } else {
            result = await this.service.selectAllNestedById(userData.userId);
        }
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a user by login.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectByLogin(req, res) {
        const { body } = req;
        const result = await this.service.selectByLogin(body.login);
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a user by id.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectById(req, res) {
        const { body } = req;
        const result = await this.service.selectById(body.id);
        return { code: result.code, values: result.values };
    }

    /**
     * Change user`s boss.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async changeBoss(req, res) {
        const { body } = req;
        const data = {
            userId: body.userId,
            bossId: body.bossId,
        };
        const result = await this.service.changeBoss(data);
        return { code: result.code, values: result.values };
    }
}

const userController = new UserController();

export default userController;
