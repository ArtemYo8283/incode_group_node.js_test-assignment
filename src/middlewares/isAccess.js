import jwt from "jsonwebtoken";
import passport from "passport";
import "dotenv/config";

import response from "./response.js";
import { UserRolesConst } from "./constants.js";

/**
 * Middleware to check if the user is an admin.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next middleware function.
 * @returns {void}
 */
export const isAdmin = (req, res, next) => {
    const userData = jwt.verify(req.params.token, process.env.JWT_SECRET);
    if (userData.role !== UserRolesConst[0]) {
        return response(403, { message: "access denied" }, res);
    }
    next();
};

/**
 * Middleware to check if the user is authorized.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next middleware function.
 * @returns {void}
 */
export const isAutorised = async (req, res, next) => {
    const { token } = req.params;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        response(401, { message: "Unathorized user" }, res);
    }
};
