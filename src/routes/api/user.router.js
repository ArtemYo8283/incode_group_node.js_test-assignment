import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { userController } from "../../controllers/index.js";

const userRouter = Router();

if (process.env.NODE_ENV !== "test") {
    userRouter.use(morgan("combined"));
}

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
