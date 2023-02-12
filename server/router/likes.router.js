import { Router } from "express";
import { saveLike } from "../controllers/likes.controller.js";

const router = Router();

router.post('/likes', saveLike);


export default router;