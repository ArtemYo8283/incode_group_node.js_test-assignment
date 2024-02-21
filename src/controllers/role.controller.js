import logger from "../config/logger.js";
import { RoleService } from "../services/index.js";

/**
 * Controller class for handling configuration related requests.
 */
export class RoleController {
    /**
     * Initializes the RoleController with a RoleService instance.
     */
    constructor() {
        this.service = new RoleService();
    }
}

const roleController = new RoleController();

export default roleController;
