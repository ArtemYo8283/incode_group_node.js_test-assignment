import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { userController } from "../../controllers/index.js";
import { UserService } from "../../services/index.js";
import { isAutorised, isAdminOrBoss } from "../../middlewares/isAccess.js";
import { ifUserBossIdNotExist, ifUserIdNotExist, ifUserNested } from "../../scripts/users/userChecking.script.js";
import { checkUserOnSelectById, checkUserOnChangeBoss } from "../../validations/user.validation.js";

const userRouter = Router();

if (process.env.NODE_ENV !== "test") {
    userRouter.use(morgan("combined"));
}

userRouter.get("/selectAll", isAutorised, validateRequestSchema, tryCatch(userController.selectAll.bind(userController)));

userRouter.get(
    "/selectById",
    isAutorised,
    checkUserOnSelectById,
    validateRequestSchema,
    ifUserIdNotExist(UserService),
    ifUserNested(UserService),
    tryCatch(userController.selectById.bind(userController)),
);

userRouter.patch(
    "/changeBoss",
    isAutorised,
    isAdminOrBoss,
    checkUserOnChangeBoss,
    validateRequestSchema,
    ifUserIdNotExist(UserService),
    ifUserBossIdNotExist(UserService),
    ifUserNested(UserService),
    tryCatch(userController.changeBoss.bind(userController)),
);

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users/selectAll:
 *   get:
 *     summary: Get Users
 *     description: Retrieve a list of users
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *         description: Authentication token
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 format: integer
 *                 description: User ID
 *               login:
 *                 type: string
 *                 description: User login
 *               bossId:
 *                 type: integer
 *                 format: integer
 *                 description: Boss ID
 *               roleId:
 *                 type: integer
 *                 format: integer
 *                 description: Role ID
 *       401:
 *         description: Unauthorized user
 *       404:
 *         description: Users not found
 *       500:
 *         description: Error selecting users
 */

/**
 * @swagger
 * /users/selectById:
 *   get:
 *     summary: Get User by ID
 *     description: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *         description: Authentication token
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *               description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: integer
 *               description: User ID
 *             login:
 *               type: string
 *               description: User login
 *             bossId:
 *               type: integer
 *               format: integer
 *               description: Boss ID
 *             roleId:
 *               type: integer
 *               format: integer
 *               description: Role ID
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: User is not your subordinate
 *       404:
 *         description: User with this ID does not exist
 *       500:
 *         description: Error selecting user
 */

/**
 * @swagger
 * /users/changeBoss:
 *   patch:
 *     summary: Change User's Boss
 *     description: Change the boss of a user by user ID
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *         description: Authentication token
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *               description: User ID
 *             bossId:
 *               type: integer
 *               description: New boss ID
 *     responses:
 *       200:
 *         description: User's boss changed successfully
 *       400:
 *         description: Boss ID can't be 0
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: User is not your subordinate
 *       404:
 *         description: User or boss with this ID does not exist
 *       500:
 *         description: Error selecting users
 */
