import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { roleController } from "../../controllers/index.js";

const roleRouter = Router();

if (process.env.NODE_ENV !== "test") {
    roleRouter.use(morgan("combined"));
}

export default roleRouter;

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management and retrieval
 */
