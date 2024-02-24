import jwt from "jsonwebtoken";

import response from "../../middlewares/response.js";
import isExist from "../../middlewares/isExist.js";

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserExist = (Service) => async (req, res, next) => {
    const isLogin = await isExist(Service, "login", req.body.login);
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
    const isLogin = await isExist(Service, "login", req.body.login);
    if (!isLogin) {
        return response(404, { message: "User with this login not exist" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided id does not exist.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserBossIdNotExist = (Service) => async (req, res, next) => {
    if (parseInt(req.body.bossId, 10) === 0) {
        next();
        return;
    }
    const isId = await isExist(Service, "id", req.body.bossId);
    if (!isId) {
        return response(404, { message: "User boss with this id not exist" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided id does not exist.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserIdNotExist = (Service) => async (req, res, next) => {
    const isId = await isExist(Service, "id", req.body.userId);
    if (!isId) {
        return response(404, { message: "User with this id not exist" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided id is nested.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserNested = (Service) => async (req, res, next) => {
    const { body } = req;
    const { token } = req.headers;
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const service = new Service();
    const result = await service.selectAllNestedById(userData.userId);

    let flag = false;
    result.values.forEach((item) => {
        if (item.id === parseInt(body.userId, 10)) {
            flag = true;
        }
    });
    if (!flag) {
        return response(403, { message: "User is not your subordinates" }, res);
    }
    next();
};
