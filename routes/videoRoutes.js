// importing express package
import express from "express";
// importing video controllers
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
// importing authentication middleware
import { protect } from "../middleware/authMiddleware.js";
// importing multer upload middleware
import upload from "../middleware/upload.js";
import { dislikeVideo, likeVideo } from "../controllers/LikeDislikeController.js";

// creating express router instance
const router = express.Router();

// unprotected routes
// route to get all videos
router.get("/videos", getVideos);

// route to get single video by id
router.get("/video/:id", getVideoById);

// route to add dummy video data directly
router.post("/videos", addVideo);

// Protected routes
// route to upload new video by only logged in users
router.post("/upload", protect, upload.single("video"), uploadVideo);

// route to get logged in user's uploaded videos
router.get("/myvideos", protect, getMyVideos);

// route to upload comment on a video
router.post("/video/:id/uploadComment", protect, uploadComment);

// route to edit comment
router.put("/video/:id/editComment", protect, editComment);

// route to delete comment
router.delete("/video/:id/deleteComment", protect, deleteComment);

// route to edit uploaded video
router.put("/video/:id/edit", protect,  upload.single("video"), editMyVideo);

// route to delete uploaded video
router.delete("/video/:id", protect, deleteMyVideo);

// route to like a video
router.put("/video/:id/like", protect, likeVideo);

// route to disllike a video
router.put("/video/:id/dislike", protect, dislikeVideo);

// exporting router
export default router;
