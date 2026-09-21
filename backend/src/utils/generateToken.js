import "dotenv/config";
import jwt from "jsonwebtoken";

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

export const generateToken = (user, res ) => {
    // Check JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }

    const payload = {id: user.id, role: user.role,};


    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        {
            expiresIn: TOKEN_TTL_SECONDS,
        }
    );

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 
            process.env.NODE_ENV === "production" 
                ? "strict" 
                : "lax",
        maxAge: TOKEN_TTL_SECONDS * 1000,
    });

};