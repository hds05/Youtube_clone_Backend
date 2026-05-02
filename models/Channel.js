import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  channelName: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true    
  },
  channelIcon: {
    type: String,
    default: ""
  },
  subscribers: {
    type: Number,
    default: 0
  }
});

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;