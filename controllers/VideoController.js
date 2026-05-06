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
    const video = await Video.findById(req.params.id).populate(
      "comments.userId",
      "name",
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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

    const channel = await Channel.findOne({ userId });

    if (!channel) {
      return res.status(400).json({
        message: "Create channel first",
      });
    }

    let finalVideoUrl = "";

    if (req.body.videoType === "youtube") {
      if (!req.body.videoUrl) {
        return res.status(400).json({ message: "Video URL required" });
      }
      finalVideoUrl = req.body.videoUrl;
    } else {
      if (!req.file) {
        return res.status(400).json({
          message: "No video file uploaded",
        });
      }

      finalVideoUrl = `/uploads/videos/${req.file.filename}`;
    }

    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      thumbnailUrl: req.body.thumbnailUrl,

      videoType: req.body.videoType,
      videoUrl: finalVideoUrl,

      userId,
      uploader: req.user.name,
      channelId: channel._id,
      channelName: channel.channelName,
      channelIcon: channel.channelIcon,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded",
      video: newVideo,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
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
  try {
    const videoId = req.params.id;
    const { text } = req.body;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const newComment = {
      userId: req.user.id,
      text,
      timestamp: new Date(),
    };

    video.comments.unshift(newComment);
    await video.save();

    const updatedVideo = await Video.findById(videoId).populate(
      "comments.userId",
      "name",
    );

    res.status(201).json({
      message: "comment uploaded",
      comments: updatedVideo.comments,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const videoId = req.params.id;
    const { commentId, text } = req.body;
    const video = await Video.findById(videoId);
    const comment = await video.comments.id(commentId);

    if (!video) {
      return res.status(400).json({ message: "Video not found..." });
    }

    if (!comment) {
      return res
        .status(400)
        .json({ message: "The comment you want to edit is not there...😬" });
    }
    if (comment.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not allowed to edit this comment" });
    }

    comment.text = text;

    await video.save();

    const updatedVideo = await Video.findById(videoId).populate(
      "comments.userId",
      "name",
    );

    res.status(200).json({
      message: "Comment updated",
      comments: updatedVideo.comments,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: `Server Error : ${err.message} ` });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const videoId = req.params.id;
    const { commentId } = req.body;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = video.comments.id(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ message: "The comment you want to edit is not there...😬" });
    }

    if (
      (!comment.userId || comment.userId.toString() !== req.user.id) &&
      comment.userName !== req.user.name
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    comment.deleteOne();

    await video.save();

    const updatedVideo = await Video.findById(videoId).populate(
      "comments.userId",
      "name",
    );

    res.status(200).json({
      message: "Comment  Deleted Successfully...",
      comments: updatedVideo.comments,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

export const editMyVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      title,
      description,
      category,
      thumbnailUrl,
      videoType,
      videoUrl,
    } = req.body;

    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
    video.videoType = videoType || video.videoType;

    if (videoType === "youtube") {
      video.videoUrl = videoUrl || video.videoUrl;
    }

    await video.save();

    res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteMyVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this video" });
    }

    await video.deleteOne();

    res.status(200).json({
      message: "Video Deleted Successfully...",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};
