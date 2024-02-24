import logger from "../config/logger.js";
import { Role } from "../models/index.js";

export default class RoleService {
    /**
     * Retrieves a role by id
     * @param {string} id - The role's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const role = await Role.findAll();
            return { code: 200, values: role };
        } catch (error) {
            logger.log({
                level: "error",
                message: "Error selecting role",
                error: new Error(error),
            });
            return { code: 400, values: `Error selecting role: ${error}` };
        }
    }

    /**
     * Retrieves a role by id
     * @param {string} id - The role's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const role = await Role.findByPk(id);
            return { code: 200, values: role };
        } catch (error) {
            logger.log({
                level: "error",
                message: "Error selecting role",
                error: new Error(error),
            });
            return { code: 400, values: `Error selecting role: ${error}` };
        }
    }

    /**
     * Checks if a role exists
     * @param {string} field - The field to search for the role
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const whereClause = {};
            whereClause[field] = value;
            const role = await Role.findOne({
                where: whereClause,
            });
            if (role) {
                return role;
            }
        } catch (error) {
            logger.log({
                level: "error",
                message: `Error fetching role by ${field}`,
                error: new Error(error),
            });
            return { code: 500, values: `Error fetching role by ${field}` };
        }
    }
}
