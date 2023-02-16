import { Router } from "express";
import { deleteLike, saveLike } from "../controllers/likes.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.post('/likes', verifyToken, saveLike);
router.delete('/likes/:id', verifyToken, deleteLike);


export default router;