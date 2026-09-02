import express from "express";
import { getMe, login, logout, register, } from '../controllers/authController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
    loginSchema,
    registerSchema
} from "../validators/authValidators.js";

const router = express.Router()

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);



export default router;