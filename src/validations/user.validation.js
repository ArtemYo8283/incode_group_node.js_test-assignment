import { body } from "express-validator";

/**
 * Validation chain method for checking user data during deletion and selection by login
 */
export const checkUserOnSelectByLogin = [
    body("login")
        .exists({ checkFalsy: true })
        .withMessage("Login must be provided")
        .isString()
        .withMessage("Invalid login format"),
];

/**
 * Validation chain method for checking user data during deletion and selection by Id
 */
export const checkUserOnSelectById = [
    body("id")
        .exists({ checkFalsy: true })
        .withMessage("Id must be provided")
        .isNumeric()
        .withMessage("Id must be a number"),
];

/**
 * Validation chain method for checking user data during deletion and selection by Id
 */
export const checkUserOnChangeBoss = [
    body("userId")
        .exists({ checkFalsy: true })
        .withMessage("User Id must be provided")
        .isNumeric()
        .withMessage("User Id must be a number"),
    body("bossId")
        .exists({ checkFalsy: true })
        .withMessage("Boss Id must be provided")
        .isNumeric()
        .withMessage("Boss Id must be a number"),
];
