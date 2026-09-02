import express from "express";
import {
    addToWatchList,
    getWatchlist,
    removeFromWatchlist,
    updateWatchlistItem
} from '../controllers/watchlistController.js';

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema, updateWatchlistItemSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getWatchlist);
router.post("/", validateRequest(addToWatchlistSchema), addToWatchList);
router.put("/:id", validateRequest(updateWatchlistItemSchema), updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);

export default router;