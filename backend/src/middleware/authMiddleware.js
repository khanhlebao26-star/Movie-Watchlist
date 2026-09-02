import "dotenv/config";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// Read the token from the request
// Check if token is valid
export const authMiddleware = async (req, res, next) => {
    let token;
    
    // Check Authorization header
    const authHeader = req.headers.authorization || "";

    if (authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // If no Bearer token, check cookie
    if (!token && req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({error: "Not authorized, no token provided"});
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing");
        }

        // Verify token and extract the user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user
        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
        });

        if (!user) {
            return res.status(401).json({error: "User no longer exists"});
        } 

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "error",
                message: "Token has expired",
            });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: "error",
                message: "Invalid token",
            });
        }

        next(err);
    }
}