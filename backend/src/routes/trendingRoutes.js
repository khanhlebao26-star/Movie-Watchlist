import express from "express";
import { getTrendingPeople } from "../controllers/trendingController.js";

const router = express.Router();

router.get("/people", getTrendingPeople);

export default router;