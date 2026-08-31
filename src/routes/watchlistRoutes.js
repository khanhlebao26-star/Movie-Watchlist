import express from "express";
import { addToWatchList, removeFromWatchlist, updateWatchlistItem } from '../controllers/watchlistController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.use(authMiddleware);

router.post("/", addToWatchList);

// {{baseUrl}}/watchlist/:id
router.put("/:id", updateWatchlistItem);

// {{baseUrl}}/watchlist/:id
router.delete("/:id", removeFromWatchlist);

export default router;