import { body } from "express-validator";

/**
 * Validation chain method for checking role data during deletion and selection by Id
 */
export const checkRoleOnSelectById = [
    body("id")
        .exists({ checkFalsy: true })
        .withMessage("Id must be provided")
        .isNumeric()
        .withMessage("Id must be a number"),
];
