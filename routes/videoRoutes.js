import express from "express";
import {
  getVideos,
  getVideoById,
  addVideo,
  uploadVideo,
  getMyVideos,
  uploadComment,
  editComment,
  deleteComment,
  deleteMyVideo,
  editMyVideo,
} from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/videos", getVideos);
router.get("/video/:id", getVideoById);
router.post("/videos", addVideo);
router.post("/upload", protect, upload.single("videoFile"), uploadVideo);
router.get("/myvideos", protect, getMyVideos);

router.post("/video/:id/uploadComment", protect, uploadComment);
router.put("/video/:id/editComment", protect, editComment);
router.delete("/video/:id/deleteComment", protect, deleteComment);

router.put("/video/:id/edit", protect, editMyVideo);
router.delete("/video/:id", protect, deleteMyVideo);

export default router;
