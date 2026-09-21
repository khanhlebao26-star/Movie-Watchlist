import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: {email: email },
    });

    if (userExists) {
        return res
        .status(400)
        .json({
            status: "error",
            message: "User already exists with this email"
        });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    // Generate JWT token  
    generateToken(user, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user email already exists in the table
    const user = await prisma.user.findUnique({
        where: {email: email },
    });

    if (!user) {
        return res
        .status(401)
        .json({
            status: "error",
            message: "Invalid email or password"
        });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res
        .status(401)
        .json({
            status: "error",
            message: "Invalid email or password"
        });
    }

    // Generate JWT token  
    generateToken(user, res);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "producttion",
        sameSite:
            process.env.NODE_ENV === "producttion"
                ? "strict"
                : "lax",
        // expires: new Date(0)
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
};

export const getMe = async (req, res) => {

    res.status(200).json({
        status: "success",
        data: {
            user: req.user,
        },
    });

};

export { login, logout, register };

