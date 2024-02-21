import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { authController } from "../../controllers/index.js";

const authRouter = Router();

if (process.env.NODE_ENV !== "test") {
    authRouter.use(morgan("combined"));
}

export default authRouter;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management and retrieval
 */
