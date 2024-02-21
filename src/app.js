import express from "express";
import compression from "compression";
import helmet from "helmet";
import passport from "passport";
import xss from "xss-clean";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";

import ApiLimiter from "./middlewares/rateLimiter.js";
import AppRouter from "./routes/index.js";
import { ErrorHandler } from "./middlewares/errorHandler.js";

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

const app = express();
const router = new AppRouter(app);

app.use(compression());
app.use(helmet());
app.use(xss());
app.use(passport.initialize());
if (process.env.NODE_ENV === "production") {
    app.use("/api", ApiLimiter);
}
app.set("port", process.env.PORT || 8080);
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1000mb" }));
app.use(ErrorHandler);
router.init();

export default app;
