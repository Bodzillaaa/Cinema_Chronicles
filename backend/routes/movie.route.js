import express from "express";
import {
  getAllMovies,
  getDirectorDetails,
  getMovieDetails,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/", getAllMovies);

router.get("/details/:id", getMovieDetails);
router.get("/director/:id", getDirectorDetails);

export default router;
