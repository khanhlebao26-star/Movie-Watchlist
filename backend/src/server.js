import "dotenv/config";

import app from "./app.js";

import {
    connectDB,
    disconnectDB,
} from "./config/db.js";

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