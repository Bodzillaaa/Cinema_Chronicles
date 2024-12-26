import express from "express";
import {
  searchMovie,
  searchMovieByGenre,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movie/:query", searchMovie);
router.get("/genre/:query", searchMovieByGenre);

export default router;
