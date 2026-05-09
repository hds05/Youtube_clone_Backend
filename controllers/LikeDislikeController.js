import Video from "../models/Video.js";

// controller to like a video
export const likeVideo = async (req, res) => {
  try {
    // getting video id from params
    const videoId = req.params.id;

    // finding video by id
    const video = await Video.findById(videoId);

    // checking if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // checking if user already liked the video
    const alreadyLiked = video.likedBy.includes(req.user.id);

    // if already liked then remove like
    if (alreadyLiked) {
      video.likedBy = video.likedBy.filter(
        (userId) => userId.toString() !== req.user.id,
      );

      video.likes = video.likedBy.length;
    } else {
      // add user to likedBy array
      video.likedBy.push(req.user.id);

      // remove dislike if already disliked
      video.dislikedBy = video.dislikedBy.filter(
        (userId) => userId.toString() !== req.user.id,
      );

      // updating counts
      video.likes = video.likedBy.length;
      video.dislikes = video.dislikedBy.length;
    }

    // saving updated video
    await video.save();

    // sending response
    res.status(200).json({
      message: "Like updated",
      likes: video.likes,
      dislikes: video.dislikes,
    });
  } catch (err) {
    // showing backend error message
    res.status(500).json({message: err.message || "Something went wrong"});
  }
};

// controller to dislike a video
export const dislikeVideo = async (req, res) => {
  try {
    // getting video id from params
    const videoId = req.params.id;

    // finding video by id
    const video = await Video.findById(videoId);

    // checking if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // checking if user already disliked the video
    const alreadyDisliked = video.dislikedBy.includes(req.user.id);

    // if already disliked then remove dislike
    if (alreadyDisliked) {
      video.dislikedBy = video.dislikedBy.filter(
        (userId) => userId.toString() !== req.user.id,
      );

      video.dislikes = video.dislikedBy.length;
    } else {
      // add user to dislikedBy array
      video.dislikedBy.push(req.user.id);

      // remove like if already liked
      video.likedBy = video.likedBy.filter(
        (userId) => userId.toString() !== req.user.id,
      );

      // updating counts
      video.likes = video.likedBy.length;
      video.dislikes = video.dislikedBy.length;
    }

    // saving updated video
    await video.save();

    // sending response
    res.status(200).json({
      message: "Dislike updated",
      likes: video.likes,
      dislikes: video.dislikes,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
