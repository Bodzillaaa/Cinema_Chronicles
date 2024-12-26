import express from "express";
import { postRating, postReview } from "../controllers/user.controller.js";
import {
  deleteItemFromWatchlist,
  getWatchlist,
} from "../controllers/search.controller.js";

const router = express.Router();

router.post("/rating/:id", postRating);
router.post("/review/:id", postReview);

router.get("/watchlist", getWatchlist);
router.delete("/watchlist/:id", deleteItemFromWatchlist);

export default router;
