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

/**
 * @swagger
 * /roles/selectAll:
 *   get:
 *     summary: Select all roles
 *     description: Select all roles
 *     tags: [Roles]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       '401':
 *         description: Unauthorized user
 *       '500':
 *         description: Error selecting role
 */

/**
 * @swagger
 * /roles/selectById:
 *   get:
 *     summary: Select role by id
 *     description: Select role by id
 *     tags: [Roles]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             required:
 *               - id
 *     responses:
 *       '200':
 *         description: Role selected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       '401':
 *         description: Unauthorized user
 *       '404':
 *         description: Role with this id does not exist
 *       '500':
 *         description: Error selecting roles
 */
