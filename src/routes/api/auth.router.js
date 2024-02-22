import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import { registerValidateChainMethod, loginValidateChainMethod } from "../../validations/auth.validation.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { authController } from "../../controllers/index.js";
import { UserService } from "../../services/index.js";
import { ifUserExist, ifUserNotExist } from "../../scripts/users/userChecking.script.js";

const authRouter = Router();

if (process.env.NODE_ENV !== "test") {
    authRouter.use(morgan("combined"));
}

authRouter.post(
    "/register",
    registerValidateChainMethod,
    validateRequestSchema,
    ifUserExist(UserService),
    tryCatch(authController.register.bind(authController)),
);

authRouter.post(
    "/login",
    loginValidateChainMethod,
    validateRequestSchema,
    ifUserNotExist(UserService),
    tryCatch(authController.login.bind(authController)),
);

export default authRouter;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management and retrieval
 */
