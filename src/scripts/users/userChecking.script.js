import response from "../../middlewares/response.js";
import isExist from "../../middlewares/isExist.js";

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserExist = (Service) => async (req, res, next) => {
    const isLogin = await isExist(Service, "Login", req.body.login);
    if (isLogin) {
        return response(409, { message: "User with this login already exists" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided login does not exist.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserNotExist = (Service) => async (req, res, next) => {
    const isLogin = await isExist(Service, "Login", req.body.login);
    if (!isLogin) {
        return response(404, { message: "User with this login not exist" }, res);
    }
    next();
};
