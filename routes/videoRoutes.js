import express from "express";
import { getVideos, getVideoById, addVideo } from "../controllers/videoController.js";

const router = express.Router();

router.get("/videos", getVideos);
router.get("/video/:id", getVideoById);
router.post("/videos", addVideo);

export default router;