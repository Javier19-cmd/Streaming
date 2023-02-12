import { Router } from "express";
import { createHistory } from "../controllers/history.controller.js";

const router = Router();

router.post('/historial', createHistory);


export default router;