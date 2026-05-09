// importing express package
import express from "express";
// importing dotenv package to use environment variables
import dotenv from "dotenv";
// importing MongoDB connection function
import MongoDB from "./config/db.js";
// importing user related routes
import userRoutes from "./routes/userRoutes.js";
// importing video related routes
import videoRoutes from "./routes/videoRoutes.js";
// importing chanel related routes
import channelRoutes from "./routes/channelRoutes.js";
// importing cors package to allow frontend-backend communication
import cors from "cors";
// importing auth middleware for protected routes
import { protect } from "./middleware/authMiddleware.js";

// loading environment variables from .env file
dotenv.config();

// creating express application
const app = express();

// enabling CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    // allowing cookies/auth headers
    credentials: true,
  }),
);

// middleware to parse incoming JSON data
app.use(express.json());
// default route to check backend status
app.get("/", (req, res) => {
  res.send("Backend of Youtube is running...");
});
// connecting to MongoDB and starting server (only after connecting to DB server can start)
MongoDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The server is running on Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // if DB connection fails
    console.log("Failed to connect because of DB", err.message);
  });

// user authentication routes
app.use("/", userRoutes);
// video related routes
app.use("/", videoRoutes);
// Channel related routes
app.use("/channel", channelRoutes);
// serving uploaded files as static files
app.use("/uploads", express.static("uploads"));
