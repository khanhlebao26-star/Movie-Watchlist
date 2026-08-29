import { config } from 'dotenv';
import express from "express";
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';


config();
connectDB();

const app = express();

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

// Handle unhandled promise rejecctions (e.g., database connection errors)
process.on("unhandledRejection", (err => {
    console.log("Unhandled Rejection:", err);
    Server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
}));

// Handle uncaught exceptions
process.on("uncaughtException", (err => {
    console.log("Uncaught Exceptions:", err);
    Server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
}));

// Graceful shutdown
process.on("SIGTERM", (err => {
    console.log("SIGTERM received, shutting down gracefully");
    Server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
}));

