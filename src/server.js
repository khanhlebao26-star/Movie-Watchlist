import { config } from "dotenv";
import express from "express";

import { connectDB, disconnectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = 5001;

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

startServer();

// Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);

    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Handle uncaught exception
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);

    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");

    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
    }
});