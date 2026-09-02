import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (userId, res ) => {
    // Check JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }

    const payload = {id: userId};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: (1000 * 60 * 60 * 24) * 7
    });
    return token;
};