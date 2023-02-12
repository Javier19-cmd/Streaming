import { Router } from "express";
import { saveLike } from "../controllers/likes.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.post('/likes', verifyToken, saveLike);


export default router;