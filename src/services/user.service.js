import logger from "../config/logger.js";
import { User } from "../models/index.js";

export default class UserService {
    /**
     * Retrieves a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const user = await User.findAll();
            return { code: 200, values: user };
        } catch (error) {
            logger.log({
                level: "error",
                message: "Error selecting user",
                error: new Error(error),
            });
            return { code: 400, values: `Error selecting user: ${error}` };
        }
    }

    /**
     * Retrieves a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const user = await User.findByPk(id);
            return { code: 200, values: user };
        } catch (error) {
            logger.log({
                level: "error",
                message: "Error selecting user",
                error: new Error(error),
            });
            return { code: 400, values: `Error selecting user: ${error}` };
        }
    }

    /**
     * Retrieves a user by login
     * @param {string} login - The user's login
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectByLogin(login) {
        try {
            const user = await User.findOne({
                where: {
                    login,
                },
            });
            return { code: 200, values: user };
        } catch (error) {
            logger.log({
                level: "error",
                message: "Error selecting user",
                error: new Error(error),
            });
            return { code: 400, values: `Error selecting user: ${error}` };
        }
    }

    /**
     * Creates a new user
     * @param {Object} data - Data for creating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newUser = await User.create({
                login: data.login,
                password: data.password,
                roleId: data.roleId,
                bossId: data.bossId,
            });
            return { code: 200, values: "User registered successfully" };
        } catch (error) {
            logger.log({
                level: "error",
                message: `Error creating user: ${error}`,
                error: new Error(error),
            });
            return { code: 400, values: `Error creating user: ${error}` };
        }
    }

    /**
     * Checks if a user exists
     * @param {string} field - The field to search for the user
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const user = await User.findOne({
                where: {
                    login: value,
                },
            });
            if (user) {
                return user;
            }
        } catch (error) {
            logger.log({
                level: "error",
                message: `Error fetching user by ${field}`,
                error: new Error(error),
            });
            return { code: 500, values: `Error fetching user by ${field}` };
        }
    }
}
