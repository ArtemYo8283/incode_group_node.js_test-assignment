import { body } from "express-validator";
import { UserRolesConst } from "../middlewares/constants.js";

/**
 * Validation chain method for user registration
 */
export const registerValidateChainMethod = [
    body("login")
        .exists({ checkFalsy: true })
        .withMessage("Login must be provided")
        .isString()
        .withMessage("Invalid login format"),
    body("password")
        .exists({ checkFalsy: true })
        .withMessage("Password must be provided")
        .isString()
        .withMessage("Password must be a string")
        .custom((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value))
        .withMessage("Password is weak"),
    body("confirmPassword")
        .exists({ checkFalsy: true })
        .withMessage("Password confirmation must be provided")
        .isString()
        .withMessage("Password confirmation must be a string")
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
        }),
    body("roleId")
        .exists({ checkFalsy: true })
        .withMessage("Role Id must be provided")
        .isNumeric()
        .withMessage("Role Id must be a number"),
    body("bossId")
        .exists({ checkFalsy: true })
        .withMessage("Boss Id must be provided")
        .isNumeric()
        .withMessage("Boss Id must be a number"),
];

/**
 * Validation chain method for user login
 */
export const loginValidateChainMethod = [
    body("login")
        .exists({ checkFalsy: true })
        .withMessage("Login must be provided")
        .isString()
        .withMessage("invalid format"),
    body("password")
        .exists({ checkFalsy: true })
        .withMessage("Password must be provided")
        .isString()
        .withMessage("Password must be a string"),
];
