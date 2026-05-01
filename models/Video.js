import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentId: String,
  userId: String,
  text: String,
  timestamp: Date
});

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    category: { type: String, required: true },
    channelIcon: String,
    uploader: String,
    channelId: String,
    views: String,
    likes: String,
    dislikes: String,
    uploadDate: String,
    subscribers: String,
    time: String,
    comments: [commentSchema],
    time: String
});

const Video = mongoose.model("Video", videoSchema)

export default Video;