// importing mongoose package
import mongoose from "mongoose";

// Creating schema for comments
const commentSchema = new mongoose.Schema({
  // reference to user who wrote the comment
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // linking comment with User model
    ref: "User",
  },
  // comment text
  text: String,
  // when the comment was written
  timestamp: {
    type: Date,
    // default current date and time
    default: Date.now,
  },
});

// creating video schema
const videoSchema = new mongoose.Schema(
  {
    // title for the video
    title: { type: String, required: true },
    // Description for the video
    description: { type: String, required: true },
    // Category for the video
    category: { type: String, required: true },
    // thumbnail image url for the video
    thumbnailUrl: { type: String, required: true },

    // type of the video
    // youtube => external youtube video
    // upload => uploaded from local device
    videoType: {
      type: String,
      // only these values are allowed
      enum: ["youtube", "upload"],
      required: true,
    },
    // stores youtube video id or uploaded video path
    videoUrl: {
      type: String,
      required: true,
    },

    // reference to the user who uploaded the video
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // linking with User model
      ref: "User",
    },
    // uploader name
    uploader: String,
    // reference to related channell
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      // linking with Channel model
      ref: "Channel",
    },
    // channel name
    channelName: { type: String, required: true },
    // channel icon
    channelIcon: String,

    // video views
    views: {
      type: Number,
      // default 0
      default: 0,
    },

    // likes on the video
    likes: {
      type: Number,
      // defaut 0
      default: 0,
    },
    // dislikes on the video
    dislikes: {
      type: Number,
      // default 0
      default: 0,
    },

    // users who liked the video
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // users who disliked the video
    dislikedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // date when video was uploaded
    uploadDate: {
      type: Date,
      // default current date
      default: Date.now,
    },
    // subscribers count of channel
    subscribers: {
      type: Number,
      // default subscribers count
      default: 0,
    },
    // array of comments using commentSchema
    comments: [commentSchema],
  },

  // automatically adds createdAt and updatedAt fields
  {
    timestamps: true,
  },
);

// creating Video model using videoSchema
const Video = mongoose.model("Video", videoSchema);
// exporting Video model
export default Video;
