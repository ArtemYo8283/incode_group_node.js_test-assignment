import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import { registerValidateChainMethod, loginValidateChainMethod } from "../../validations/auth.validation.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { authController } from "../../controllers/index.js";
import { UserService, RoleService } from "../../services/index.js";
import { ifUserExist, ifUserNotExist, ifUserBossIdNotExist } from "../../scripts/users/userChecking.script.js";
import { ifRoleIdAuthNotExist } from "../../scripts/roles/roleChecking.script.js";

const authRouter = Router();

if (process.env.NODE_ENV !== "test") {
    authRouter.use(morgan("combined"));
}

authRouter.post(
    "/register",
    registerValidateChainMethod,
    validateRequestSchema,
    ifUserExist(UserService),
    ifUserBossIdNotExist(UserService),
    ifRoleIdAuthNotExist(RoleService),
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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               roleId:
 *                 type: integer
 *               bossId:
 *                 type: integer
 *             required:
 *               - login
 *               - password
 *               - confirmPassword
 *               - roleId
 *               - bossId
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Boss id can't be 0 if you aren't Admin
 *       '404':
 *         description: Role with this id not exist or User boss with this id not exist
 *       '409':
 *         description: User with this login already exists
 *       '500':
 *         description: Error creating user
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate user with provided credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - login
 *               - password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userData:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                     login:
 *                       type: string
 *                     roleId:
 *                       type: number
 *                     bossId:
 *                       type: number
 *                 token:
 *                   type: string
 *       '400':
 *         description: Password do not match
 *       '404':
 *         description: User with this login not exist
 *       '500':
 *         description: Error selecting user
 */
