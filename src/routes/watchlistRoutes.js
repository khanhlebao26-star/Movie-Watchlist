import express from "express";
import {
    addToWatchList,
    removeFromWatchlist,
    updateWatchlistItem
} from '../controllers/watchlistController.js';

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema, updateWatchlistItemSchema } from "../validators/watchlistValidators.js";


const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchList);

// {{baseUrl}}/watchlist/:id
router.put("/:id", validateRequest(updateWatchlistItemSchema), updateWatchlistItem);

// {{baseUrl}}/watchlist/:id
router.delete("/:id", removeFromWatchlist);

export default router;