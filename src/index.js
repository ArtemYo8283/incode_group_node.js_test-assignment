import app from "./app.js";
import logger from "./config/logger.js";
import { disconnectFromDB } from "./database/db.js";

const port = app.get("port");

const server = app.listen(port, () => {
    logger.log({
        level: "info",
        message: `Server started on port ${port}`,
    });
});

process.on("SIGTERM", () => {
    logger.log({
        level: "info",
        message: "SIGTERM received",
    });
    disconnectFromDB();
    if (server) {
        server.close();
    }
});

export default server;
