// importing channel model
import Channel from "../models/Channel.js";
// importing Video model
import Video from "../models/Video.js";

// controller to get all videos
export const getVideos = async (req, res) => {
  try {
    // fetching all videos from database
    const videos = await Video.find();
    // sending videos as response
    res.json(videos);
  } catch (err) {
    // sending server error response
    res.status(500).json({ message: err.message });
  }
};

// Controller to get video by id
export const getVideoById = async (req, res) => {
  try {
    // finding video by id provided in params and populating comment user names
    const video = await Video.findById(req.params.id).populate(
      "comments.userId",
      "name",
    );

    // checking if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }
    // sending the video data
    res.status(200).json(video);
  } catch (err) {
    // sending server error response
    res.status(500).json({
      message: err.message,
    });
  }
};

// controller to add new video directly with out protect auth for dummy data
export const addVideo = async (req, res) => {
  try {
    // creating new video document
    const newVideo = new Video(req.body);
    // saving video into database
    await newVideo.save();
    // sending created video response
    res.json(newVideo);
  } catch (err) {
    // sending server error response
    res.status(500).json({ message: err.message });
  }
};

// controller to upload video through channel
export const uploadVideo = async (req, res) => {
  try {
    // get logged in user
    const userId = req.user.id;

    // finding user channel
    const channel = await Channel.findOne({ userId });
    // if no channel then return error
    if (!channel) {
      return res.status(400).json({
        message: "Create channel first",
      });
    }

    // variable to store final video URL
    let finalVideoUrl = "";

    // checking if uploaded video type is youtube
    if (req.body.videoType === "youtube") {
      // validating youtube url
      if (!req.body.videoUrl) {
        return res.status(400).json({ message: "Video URL required" });
      }
      // storing youtube video url
      finalVideoUrl = req.body.videoUrl;
    } else {
      // checking if local video file exists
      if (!req.file) {
        return res.status(400).json({
          message: "No video file uploaded",
        });
      }
      // generating uploaded video path
      finalVideoUrl = `/uploads/videos/${req.file.filename}`;
    }
    // creating new video document
    const newVideo = new Video({
      // stroing video related details
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      thumbnailUrl: req.body.thumbnailUrl,
      // storing video type and url
      videoType: req.body.videoType,
      videoUrl: finalVideoUrl,
      // stroing uploader related details
      userId,
      uploader: req.user.name,
      channelId: channel._id,
      channelName: channel.channelName,
      channelIcon: channel.channelIcon,
    });

    // saving video in DB
    await newVideo.save();

    // sending success response with uploaded video
    res.status(201).json({
      message: "Video uploaded",
      video: newVideo,
    });
  } catch (err) {
    // sending server error response
    res.status(500).json({
      message: err.message,
    });
  }
};

// controller to get logged in user's uploaded videos
export const getMyVideos = async (req, res) => {
  try {
    // find videos based on user id
    const videos = await Video.find({ userId: req.user.id });
    // sending videos in response
    res.json(videos);
  } catch (err) {
    // sending server respanse
    res.status(500).json({ message: err.message });
  }
};

// controller to upload comment on a video
export const uploadComment = async (req, res) => {
  try {
    // storing video id from params
    const videoId = req.params.id;
    // store comment text from req body
    const { text } = req.body;
    // Finding video based on video's id
    const video = await Video.findById(videoId);

    // checking if video exist
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // creating new object
    const newComment = {
      userId: req.user.id,
      text,
      // storing current timestamp
      timestamp: new Date(),
    };

    // adding comment at beginning of comments array
    video.comments.unshift(newComment);
    // save updated video in DB
    await video.save();

    // fetching updated video with populated user names
    const updatedVideo = await Video.findById(videoId).populate(
      "comments.userId",
      "name",
    );
    // sending updated comments response
    res.status(201).json({
      message: "comment uploaded",
      comments: updatedVideo.comments,
    });
  } catch (err) {
    // sending server error response
    res.status(500).json({ message: err.message });
  }
};

// Controller to edit comment
export const editComment = async (req, res) => {
  try {
    // getting video id from params
    const videoId = req.params.id;
    // extracting comment id and updated text
    const { commentId, text } = req.body;
    // finding video via video id
    const video = await Video.findById(videoId);
    // finding comment inside video comments array
    const comment = await video.comments.id(commentId);

    // checking if video exists
    if (!video) {
      return res.status(400).json({ message: "Video not found..." });
    }

    // checking if comment exists
    if (!comment) {
      return res
        .status(400)
        .json({ message: "The comment you want to edit is not there...😬" });
    }

    // checking if logged in user owns the comment
    if (comment.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not allowed to edit this comment" });
    }

    // updating comment text
    comment.text = text;

    // saving updated video
    await video.save();

    // fetching updated video with populated user names
    const updatedVideo = await Video.findById(videoId).populate(
      "comments.userId",
      "name",
    );

    // sending updated comments response
    res.status(200).json({
      message: "Comment updated",
      comments: updatedVideo.comments,
    });
  } catch (err) {
    // sending server error response
    res.status(500).json({ message: `Server Error : ${err.message} ` });
  }
};

// controller to delete comment
export const deleteComment = async (req, res) => {
  try {
    // getting video id from params
    const videoId = req.params.id;
    // extracting comment id from request body
    const { commentId } = req.body;
    // finding video via video id
    const video = await Video.findById(videoId);
    // if no video
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // find comment based on comment id in comment array
    const comment = video.comments.id(commentId);
    // check if comment exists
    if (!comment) {
      return res
        .status(404)
        .json({ message: "The comment you want to edit is not there...😬" });
    }

    // checking authorization for deleting comment
    if (
      (!comment.userId || comment.userId.toString() !== req.user.id) &&
      comment.userName !== req.user.name
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    // deleting coment
    comment.deleteOne();
    // saving updated video
    await video.save();
    // fetching updated video
    const updatedVideo = await Video.findById(videoId).populate(
      "comments.userId",
      "name",
    );

    // sending updated comments response
    res.status(200).json({
      message: "Comment  Deleted Successfully...",
      comments: updatedVideo.comments,
    });
  } catch (err) {
    // sending server error response
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

// controller to edit uploaded video
export const editMyVideo = async (req, res) => {
  try {
    // getting video id from params
    const videoId = req.params.id;
    // find video by id
    const video = await Video.findById(videoId);
    // if video not exist
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // checking if logged in user owns the video
    if (video.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    // extracting updated video data from request body
    const { title, description, category, thumbnailUrl, videoType, videoUrl } =
      req.body;
    // updating fields if new values exist
    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
    video.videoType = videoType || video.videoType;

    // if video type is youtube
    if (videoType === "youtube") {
      // updating youtube url
      video.videoUrl = videoUrl || video.videoUrl;
    } else {
      // if new local video uploaded
      if (req.file) {
        // updating local uploaded video path
        video.videoUrl = `/uploads/videos/${req.file.filename}`;
      }
    }
    // saving updated video
    await video.save();
    // sending updated video response
    res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (err) {
    // sending server error response
    res.status(500).json({ message: err.message });
  }
};

// controller to delete uploaded video
export const deleteMyVideo = async (req, res) => {
  try {
    // getting video id from params
    const videoId = req.params.id;
    // finding video by id
    const video = await Video.findById(videoId);
    // checking if video exists
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // checking if logged in user owns the video
    if (video.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this video" });
    }

    // deleting video
    await video.deleteOne();

    // sending success response
    res.status(200).json({
      message: "Video Deleted Successfully...",
    });
  } catch (err) {
    // sending server error response
    res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};
