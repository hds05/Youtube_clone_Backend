// importing Channel model
import Channel from "../models/Channel.js";

// controller to create a new channel
export const createChannel = async (req, res) => {
  try {
    // extracting channel data from request body
    const { channelName, description, channelIcon } = req.body;
    // Checking if user already has a channel
    const existing = await Channel.findOne({
      userId: req.user.id,
    });

    // if channel already exists then return error response
    if (existing) {
      return res.status(400).json({
        message: "Channel already exists",
      });
    }

    // creating new channel document
    const newChannel = new Channel({
      // storing logged in user's id
      userId: req.user.id,
      // Storing channel's details
      channelName,
      description,
      channelIcon,
    });

    // saving new channel into database
    await newChannel.save();

    // sending success response with created channel data
    res.status(201).json(newChannel);
  } catch (error) {
    console.log(error);
    // sending server error response
    res.status(500).json({
      message: error.message,
    });
  }
};

// controller to get logged in user's channel
export const getMyChannel = async (req, res) => {
  try {
    // finding channel using logged in user's id
    const channel = await Channel.findOne({
      userId: req.user.id,
    });

    // if no channel exists then return error response
    if (!channel) {
      return res.status(404).json({
        message: "No channel found",
      });
    }

    // sending channel data with status 200
    res.status(200).json(channel);
  } catch (error) {
    // sending server error response
    res.status(500).json({
      message: error.message,
    });
  }
};
