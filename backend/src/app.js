import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import trendingRoutes from "./routes/trendingRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import watchProgressRoutes from "./routes/watchProgressRoutes.js";

import {
    errorHandler,
    notFound,
} from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());

const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
    throw new Error("FRONTEND_URL is required");
}

app.use(
    cors({
        origin: frontendUrl,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: Number(process.env.AUTH_RATE_LIMIT_MAX) || 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        status: "error",
        message: "Too many attempts. Please try again later.",
    },
});

app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/api/watch-progress", watchProgressRoutes);
app.use("/api/videos", videoRoutes);
app.use("/trending", trendingRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;