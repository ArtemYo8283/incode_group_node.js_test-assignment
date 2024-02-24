import { body } from "express-validator";

/**
 * Validation chain method for checking user data during deletion and selection by Id
 */
export const checkUserOnSelectById = [
    body("userId")
        .exists({ checkFalsy: true })
        .withMessage("User Id must be provided")
        .isNumeric()
        .withMessage("User Id must be a number"),
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
