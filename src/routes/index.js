import docsRouter from "./api/docs.router.js";
import userRouter from "./api/user.router.js";
import roleRouter from "./api/role.router.js";
import authRouter from "./api/auth.router.js";
/**
 * Class representing the main application router.
 */
class AppRouter {
    /**
     * Create an instance of AppRouter.
     * @param {Object} app - The Express application object.
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Initialize the routes for the application.
     */
    init() {
        this.app.get("/", (_req, res) => {
            res.send("API Running");
        });
        this.app.use("/api/docs", docsRouter);
        this.app.use("/api/users", userRouter);
        this.app.use("/api/roles", roleRouter);
        this.app.use("/api/auth", authRouter);
    }
}

export default AppRouter;
