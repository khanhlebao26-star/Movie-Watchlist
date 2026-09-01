import express from "express";

import {
    createMovie,
    deleteMovie,
    getMovieById,
    getMovies,
    updateMovie,
} from "../controllers/movieController.js";

import { createMovieSchema, updateMovieSchema } from "../validators/movieValidators.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.post("/", authMiddleware, validateRequest(createMovieSchema), createMovie);

router.put("/:id", authMiddleware, validateRequest(updateMovieSchema), updateMovie);

router.delete("/:id", authMiddleware, deleteMovie);

export default router;