import { Router } from "express";
import { createHistory } from "../controllers/history.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.post('/historial', verifyToken, createHistory);


export default router;