import express from "express";
import {
  deleteItemFromWatchlist,
  getWatchlist,
  searchMovie,
  searchMovieByGenre,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movie/:query", searchMovie);
router.get("/genre/:query", searchMovieByGenre);

router.get("/watchlist", getWatchlist);
router.delete("/watchlist/:id", deleteItemFromWatchlist);

export default router;
