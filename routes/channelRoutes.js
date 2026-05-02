import express from "express";
import {createChannel,  getMyChannel} from "../controllers/channelController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createChannel);
router.get("/mychannel", protect, getMyChannel);

export default router;