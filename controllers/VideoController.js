import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addVideo = async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.json(newVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const userId = req.user.id;

    // find channel of logged in user
    const channel = await Channel.findOne({ userId });

    if (!channel) {
      return res.status(400).json({ message: "Create channel first" });
    }

    const newVideo = new Video({
      ...req.body,

      userId,
      channelId: channel._id,
      channelName: channel.channelName,
      channelIcon: channel.channelIcon,
    });

    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.user.id });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadComment = async (req, res) => {
  try{
    const videoId = req.params.id
    const {text} = req.body
    const video = await Video.findOne({videoId})
    const newComment = {
      commentId: Date.now().toString(),
      userId: req.user.id,
      text,
      timestamp: new Date()
    }

    video.comments.push(newComment)
    await video.save()

    res.status(201).json({
      message: "comment uploaded",
      comments: video.comments
    })
  }
  catch(err){
    console.log(err.message)
    res.status(500).json({message: err.message})
  }
};
