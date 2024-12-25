import express from "express";
import {
  getAllMovies,
  getMovieDetails,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/", getAllMovies);
router.get("/:id/details", getMovieDetails);

export default router;
