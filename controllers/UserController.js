// importing jsonwebtoken package for token generation
import jwt from "jsonwebtoken";
// importing user model
import User from "../models/User.js";
// importing bcrypt security of password (password hasing)
import bcrypt from "bcrypt";

// controller to register new user
export const registerUser = async (req, res) => {
  try {
    // getting name, email and password from req body
    const { name, email, password } = req.body;

    // checking if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required..." });
    }

    // Checking if user exist with same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists..." });
    }

    // hashing password before storing in database
    const hashPassword = await bcrypt.hash(password, 10);

    // creating new user document
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // sending hash password
    return res.status(200).json({ message: "User registered successfully..." });
  } catch (err) {
    // sending server error response
    return res.status(500).json({ message: `Error due to : ${err.message}` });
  }
};

// controller for user login
export const loginUser = async (req, res) => {
  try {
    // extracting login credentials from request body
    const { email, password } = req.body;

    // checking if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required..." });
    }

    // finding user via email
    const user = await User.findOne({ email });

    // if user exist and the comparision of password are correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create a JWT token on login
      const token = jwt.sign(
        // payload data
        { id: user._id },
        // secret key from environment variable
        process.env.JWT_secret,
        // token expiration time
        { expiresIn: "1h" },
      );

      // successful response sending token and user data
      return res.status(200).json({
        message: "Login successful!!!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      // else invalid credentials response
      return res.status(401).json({ message: "Invalid Credentials..." });
    }
  } catch (err) {
    console.log();
    // sending server error response
    return res
      .status(500)
      .json({ message: `The Error for login: ${err.message}` });
  }
};
