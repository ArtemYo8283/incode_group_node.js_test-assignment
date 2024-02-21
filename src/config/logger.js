import winston from "winston";
import "dotenv/config";

/**
 * The logger instance for logging messages.
 */
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports:
        process.env.NODE_ENV === "test"
            ? [new winston.transports.File({ filename: "logfile.log" })]
            : [new winston.transports.Console(), new winston.transports.File({ filename: "logfile.log" })],
});

export default logger;
