import Sequelize from "sequelize";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

import logger from "../config/logger.js";

let sequelize;

if (process.env.NODE_ENV === "test") {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const jsonData = fs.readFileSync(`${__dirname}/config/config.json`, "utf8");
    const data = JSON.parse(jsonData);
    sequelize = new Sequelize(data["test"].database, data["test"].username, data["test"].password, {
        host: data["test"].host,
        dialect: "mysql",
        logging: false,
    });
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
    });
}

export { sequelize };

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
