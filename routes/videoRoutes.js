import express from "express";
import { getVideos, getVideoById, addVideo, uploadVideo, getMyVideos, uploadComment } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/videos", getVideos);
router.get("/video/:id", getVideoById);
router.post("/videos", addVideo);
router.post("/upload", protect, uploadVideo);
router.get("/myvideos", protect, getMyVideos);
router.post('/video/:id/uploadComment', protect, uploadComment)

export default router;