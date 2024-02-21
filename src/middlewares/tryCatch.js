import logger from "../config/logger.js";
import response from "./response.js";

/**
 * Wraps an asynchronous controller function with a try-catch block to handle errors.
 * @param controller - The controller function to be executed.
 * @returns Returns an Express middleware function.
 */
const tryCatch = (controller) => async (req, res, next) => {
    try {
        const result = await controller(req, res);
        if (result) {
            response(result.code, result.values, res);
        } else {
            response(200, { values: "Success" }, res);
        }
    } catch (error) {
        logger.log({
            level: "error",
            message: "Try catch error",
            error: new Error(error),
        });
        response(500, { error }, res);
        return next(error);
    }
};

export default tryCatch;
