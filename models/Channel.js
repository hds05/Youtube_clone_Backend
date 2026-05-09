// importing mongoose package
import mongoose from "mongoose";

// creating schema for channel collection
const channelSchema = new mongoose.Schema({
  // reference to the user who owns the channel
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // linking with User model
    ref: "User",
    required: true,
  },
  // Channel name
  channelName: {
    type: String,
    required: true,
  },
  // Channel description
  description: {
    type: String,
    required: true,
  },
  // Channel icon
  channelIcon: {
    type: String,
    default: "",
  },
  // Subscribers
  subscribers: {
    type: Number,
    default: 0,
  },
});
// creating Channel model using schema
const Channel = mongoose.model("Channel", channelSchema);
// exporting channel model
export default Channel;
