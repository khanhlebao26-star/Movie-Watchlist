import { Prisma } from "../generated/prisma/client.js";

/**
 * 404 Not Found handler
 * Creates an error for routes that don't exist
 */
const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    next(error);
};

/**
 * Global error handler middleware
 * Handles all errors in the application and sends appropriate responses
 * Provides detailed error information in development, minimal info in production
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Zod validation error
    if (err.name === "ZodError") {
        statusCode = 400;

        message = err.issues
            ?.map((issue) => issue.message)
            .join(", ") || "Invalid data provided";
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired";
    }

    // Prisma errors
    // Handle Prisma validation errors
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid data provided";
    }

    // Handle Prisma unique constraint violations
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const field = err.meta?.target?.[0] || "field";
            statusCode = 400;
            message = `${field} already exists`;
        }
        // Handle record not found
        if (err.code === "P2025") {
            statusCode = 404;
            message = "Record not found";
        }
    }

    // Handle Prisma foreign key constraint violations
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2003") {
            statusCode = 400;
            message = "Invalid reference: related record does not exist";
        }
    }

    // send error response
    res.status(statusCode).json({
        status: "error",
        message: message,
        
        // Only include stack trace in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export { errorHandler, notFound };
