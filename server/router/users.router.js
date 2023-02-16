import { Router } from "express";
import { getUser, login, register, updateUser, updateUser1 } from "../controllers/users.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/user/:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, updateUser1);
router.get('/logged-user', verifyToken, getUser);

export default router;