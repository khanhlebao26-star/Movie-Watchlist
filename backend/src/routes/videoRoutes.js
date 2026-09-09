import express from "express";
import { streamVideo } from "../controllers/videoController.js";

const router = express.Router();

router.get("/:movieId", streamVideo);

export default router;