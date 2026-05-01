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