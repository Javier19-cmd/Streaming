import { Router } from "express";
import { createMovie } from "../controllers/movies.controller.js";

const router = Router();

router.post('/movies/:dato', createMovie);


export default router;