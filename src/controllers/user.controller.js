import logger from "../config/logger.js";
import { UserService } from "../services/index.js";

/**
 * Controller class for handling configuration related requests.
 */
export class UserController {
    /**
     * Initializes the UserController with a UserService instance.
     */
    constructor() {
        this.service = new UserService();
    }
}

const userController = new UserController();

export default userController;
