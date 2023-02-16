import { Router } from "express";
import { listMovies, listMovies1, searchMovie } from "../controllers/movies.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get('/movies/:dato', verifyToken, searchMovie);
router.get('/movies', verifyToken, listMovies);
router.get('/movies1', listMovies1);


export default router;