import Sequelize from "sequelize";
import "dotenv/config";

import logger from "../config/logger.js";

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

export async function connectToDB() {
    try {
        await sequelize.authenticate();
        logger.log({
            level: "info",
            message: "Connection to MySQL DB has been established successfully",
        });
    } catch (error) {
        logger.log({
            level: "error",
            message: "Unable to connect to the MySQL database",
            error: new Error(error),
        });
    }
}

export async function disconnectFromDB() {
    try {
        await sequelize.close();
        logger.log({
            level: "info",
            message: "Connection to MySQL DB has been closed successfully",
        });
    } catch (error) {
        logger.log({
            level: "error",
            message: "Error occurred while closing connection to the MySQL database",
            error: new Error(error),
        });
    }
}

export async function syncModels() {
    try {
        await sequelize.sync({ alter: true });
        logger.log({
            level: "info",
            message: "Models have been synchronized successfully",
        });
    } catch (error) {
        logger.log({
            level: "error",
            message: "Error occurred while synchronizing models",
            error: new Error(error),
        });
    }
}
