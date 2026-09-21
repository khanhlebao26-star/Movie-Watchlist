import express from "express";
import { getVideoUrl } from "../controllers/videoController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:movieId", authMiddleware, getVideoUrl);

export default router;