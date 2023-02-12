import { Router } from "express";
import { searchMovie } from "../controllers/movies.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get('/movies/:dato', verifyToken, searchMovie);


export default router;