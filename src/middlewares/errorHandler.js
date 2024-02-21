import response from "./response.js";

/**
 * Error handler middleware to send error response with status 400.
 * @param {Error} error - The error object.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next function.
 */
export const ErrorHandler = (error, req, res, next) => {
    response(400, { message: error.message }, res);
};

/**
 * Checks if the result object indicates a successful operation.
 * @param {{ code: number }} result - The result object containing a code.
 * @returns {boolean} True if the operation was successful, otherwise false.
 */
export const isSuccess = (result) => {
    if (result.code === 200) {
        return true;
    }
    return false;
};
