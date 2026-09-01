import { config } from "dotenv";
import express from "express";

import { connectDB, disconnectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = 5001;

const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on PORT ${PORT}`);
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);

    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exception
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);

    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");

    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});