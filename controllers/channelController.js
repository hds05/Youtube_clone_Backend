import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelIcon } = req.body;
    // console.log(req.user, "REQ.USER");
    const existing = await Channel.findOne({
      userId: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        message: "Channel already exists",
      });
    }

    const newChannel = new Channel({
      userId: req.user.id,
      channelName,
      description,
      channelIcon,
    });

    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      userId: req.user.id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "No channel found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
