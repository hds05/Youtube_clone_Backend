import multer from "multer"

// STORAGE CONFIG
const storage = multer.diskStorage({

  // WHERE TO STORE FILES
  destination: (req, file, cb) => {

    cb(null, "uploads/videos")

  },

  // FILE NAME
  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + "-" + file.originalname

    cb(null, uniqueName)

  }

})

// MULTER INSTANCE
const upload = multer({
  storage
})

export default upload