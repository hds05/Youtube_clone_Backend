import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const videoSchema = new mongoose.Schema(
  {
    // videoId: { type: String},
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },

    videoType: {
      type: String,
      enum: ["youtube", "upload"],
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    uploader: String,
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    channelName: { type: String, required: true },
    channelIcon: String,

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    uploadDate: {
      type: Date,
      default: Date.now,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  },
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
