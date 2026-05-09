// importing express package
import express from "express";
// importing channel controllers
import {createChannel,  getMyChannel} from "../controllers/channelController.js";
// importing authentication middleware
import { protect } from "../middleware/authMiddleware.js";

// creating express router instance
const router = express.Router();
// route to create a new channel with protect middleware where only logged in users can create channel
router.post("/create", protect, createChannel);
// route to get logged in user's channel with protect middleware where only logged in users can access their channel
router.get("/mychannel", protect, getMyChannel);

// exporting router
export default router;