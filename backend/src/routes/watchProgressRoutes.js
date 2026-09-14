import express from "express";

import {
    getContinueWatching,
    getMovieProgress,
    saveWatchProgress,
} from "../controllers/watchProgressController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getContinueWatching);

router.get("/:movieId", getMovieProgress);

router.put("/:movieId", saveWatchProgress);

export default router;