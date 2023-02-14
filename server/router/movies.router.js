import { Router } from "express";
import { listMovies, searchMovie } from "../controllers/movies.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get('/movies/:dato', verifyToken, searchMovie);
router.get('/movies', verifyToken, listMovies);


export default router;