import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

import { connectDB, disconnectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import trendingRoutes from "./routes/trendingRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import watchProgressRoutes from "./routes/watchProgressRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

config();

const app = express();

// Security
app.use(helmet());

// CORS
const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
    throw new Error("FRONTEND_URL is required");
}

app.use(cors({
    origin: frontendUrl,
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate Limit - Auth
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        status: "error",
        message: "Too many attempts. Please try again later."
    },
});

app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);
app.use(
    "/api/watch-progress",
    watchProgressRoutes
);
app.use("/api/videos", videoRoutes);
app.use("/trending", trendingRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5001;

let server;

const startServer = async () => {
    try {
        await connectDB();

        server = app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

const shutdown = async (exitCode = 0) => {
    console.log("Shutting down ...");

    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(exitCode);
        });
    } else {
        await disconnectDB();
        process.exit(exitCode);
    }
};

startServer();

// Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    shutdown(1);
});

// Handle uncaught exception
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    shutdown(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    shutdown(0);
});

process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    shutdown(0);
});