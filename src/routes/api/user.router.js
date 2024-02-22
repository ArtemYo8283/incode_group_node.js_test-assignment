import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { userController } from "../../controllers/index.js";
import { UserService } from "../../services/index.js";
import { isAutorised } from "../../middlewares/isAccess.js";
import { ifUserExist, ifUserNotExist } from "../../scripts/users/userChecking.script.js";
import { checkUserOnSelectByLogin, checkUserOnSelectById } from "../../validations/user.validation.js";

const userRouter = Router();

if (process.env.NODE_ENV !== "test") {
    userRouter.use(morgan("combined"));
}

userRouter.get("/selectAll", isAutorised, validateRequestSchema, tryCatch(userController.selectAll.bind(userController)));

userRouter.get(
    "/selectByLogin",
    isAutorised,
    checkUserOnSelectByLogin,
    validateRequestSchema,
    ifUserNotExist(UserService),
    tryCatch(userController.selectByLogin.bind(userController)),
);

userRouter.get(
    "/selectById",
    isAutorised,
    checkUserOnSelectById,
    validateRequestSchema,
    tryCatch(userController.selectById.bind(userController)),
);

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
