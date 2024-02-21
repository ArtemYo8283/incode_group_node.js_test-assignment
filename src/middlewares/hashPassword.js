import crypto from "crypto";
import logger from "../config/logger.js";
import "dotenv/config";

/**
 * Hashes the password using SHA-512 algorithm.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
const hashPassword = async (password) => {
    try {
        const hash = crypto.createHmac("sha512", process.env.SHA256_SECRET);
        hash.update(password);
        return hash.digest("hex");
    } catch (err) {
        logger.log({
            level: "error",
            message: "Hashing error",
            error: new Error(err),
        });
        return err;
    }
};
export default hashPassword;
