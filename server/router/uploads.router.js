import { Router } from "express";
import { uploadFile, listFiles, getFile, getImage, upload } from "../controllers/uploads.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.post('/upload', verifyToken, upload.single('file'), uploadFile);
router.get('/files', verifyToken, listFiles);
router.get('/files/:id', verifyToken, getFile);
router.get('/image/:filename', getImage);

export default router;