import logger from "../config/logger.js";
import { UserService } from "../services/index.js";

/**
 * Controller class for handling configuration related requests.
 */
export class AuthController {
    /**
     * Initializes the AuthController with a UserService instance.
     */
    constructor() {
        this.service = new UserService();
    }
}

const authController = new AuthController();

export default authController;
