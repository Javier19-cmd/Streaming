import { Router } from "express";
import { getUser, login, register, updateUser } from "../controllers/users.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/user/:id', verifyToken, updateUser);
router.get('/logged-user', verifyToken, getUser);

export default router;