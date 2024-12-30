import express from "express";
import {
  postFeedback,
  deleteItemFromWatchlist,
  getWatchlist,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/rating/:id", postFeedback);
// router.post("/review/:id", postReview);

router.get("/watchlist", getWatchlist);
router.delete("/watchlist/:id", deleteItemFromWatchlist);

export default router;
