import Sequelize from "sequelize";

import logger from "../config/logger.js";
import { User } from "../models/index.js";
import { sequelize } from "../database/db.js";

export default class UserService {
    /**
     * Retrieves all users
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const user = await User.findAll();
            if (user) {
                return { code: 200, values: user };
            }
            return { code: 404, values: "users_not_found" };
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
     * Retrieves all nested users by head id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAllNestedById(userId) {
        try {
            const query = `
                WITH RECURSIVE Subordinates AS (
                    SELECT id, login, bossId, roleId
                    FROM users
                    WHERE id = :userId
                    UNION ALL
                    SELECT u.id, u.login, u.bossId, u.roleId
                    FROM users u
                    JOIN Subordinates s ON u.bossId = s.id
                )
                SELECT * FROM Subordinates;
            `;
            const subordinates = await sequelize.query(query, {
                replacements: { userId },
                type: Sequelize.QueryTypes.SELECT,
            });
            if (subordinates) {
                return { code: 200, values: subordinates };
            }
            return { code: 404, values: "users_not_found" };
        } catch (error) {
            logger.log({
                level: "error",
                message: "Error selecting users",
                error: new Error(error),
            });
            return { code: 400, values: `Error selecting users: ${error}` };
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
            if (user) {
                return { code: 200, values: user };
            }
            return { code: 404, values: "user_not_found" };
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
     * Change user`s boss
     * @param {Object} data - Data for change user`s boss
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async changeBoss(data) {
        try {
            // Find the user by ID
            const user = await User.findByPk(data.userId);
            if (user) {
                await user.update({ bossId: data.bossId });
                return { code: 200, values: "User`s boss changed successfully" };
            }
            return { code: 404, values: "user_not_found" };
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
            const whereClause = {};
            whereClause[field] = value;
            const user = await User.findOne({
                where: whereClause,
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
