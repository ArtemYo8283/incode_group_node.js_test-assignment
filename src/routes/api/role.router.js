import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import validateRequestSchema from "../../middlewares/validateRequestSchema.js";
import tryCatch from "../../middlewares/tryCatch.js";
import { roleController } from "../../controllers/index.js";
import { RoleService } from "../../services/index.js";
import { isAutorised } from "../../middlewares/isAccess.js";
import { checkRoleOnSelectById } from "../../validations/role.validation.js";
import { ifRoleIdNotExist } from "../../scripts/roles/roleChecking.script.js";

const roleRouter = Router();

if (process.env.NODE_ENV !== "test") {
    roleRouter.use(morgan("combined"));
}
roleRouter.get("/selectAll", isAutorised, validateRequestSchema, tryCatch(roleController.selectAll.bind(roleController)));

roleRouter.get(
    "/selectById",
    isAutorised,
    checkRoleOnSelectById,
    validateRequestSchema,
    ifRoleIdNotExist(RoleService),
    tryCatch(roleController.selectById.bind(roleController)),
);

export default roleRouter;

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management and retrieval
 */
