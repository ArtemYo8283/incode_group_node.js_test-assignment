import response from "../../middlewares/response.js";
import isExist from "../../middlewares/isExist.js";

/**
 * Middleware to check if a user with the provided id does not exist.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifRoleIdNotExist = (Service) => async (req, res, next) => {
    const isId = await isExist(Service, "id", req.body.id);

    if (!isId) {
        return response(404, { message: "Role with this id not exist" }, res);
    }
    next();
};
