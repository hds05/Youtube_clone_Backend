// importing multer package
import multer from "multer";

// STORAGE CONFIG FOR UPLOADED FILES
const storage = multer.diskStorage({
  // WHERE TO UPLOADED STORE FILES
  destination: (req, file, cb) => {
    // cb => callback function
    // first argument => error (null means no error)
    // second argument => destination folder path
    cb(null, "uploads/videos");
  },

  // FILE NAME
  filename: (req, file, cb) => {
    // creating unique file name using current timestamp to avoid duplicate file names
    const uniqueName = Date.now() + "-" + file.originalname;

    // saving file with generated name
    cb(null, uniqueName);
  },
});

// creating multer instance with storage configuration
const upload = multer({
  storage,
});
// exporting upload middleware
export default upload;
