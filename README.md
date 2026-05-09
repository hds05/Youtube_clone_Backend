# YouTube Clone Backend

Backend API for a YouTube Clone application built using Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, bcrypt, and Multer.

This backend handles:

- User Authentication
- Video Upload & Management
- Channel Management
- Comments System
- Protected Routes
- File Uploads using Multer

---

# ▶️ Important

While testing, for the best experience, make sure both frontend and backend servers are running simultaneously.

---

# 🚀 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- dotenv
- CORS

---

# 📁 Project Structure

```bash
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── channelController.js
│   ├── LikeDislikeController.js
│   ├── UserController.js
│   └── videoController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── upload.js
│   └── validationMiddleware.js
│
├── models/
│   ├── Channel.js
│   ├── User.js
│   └── Video.js
│
├── routes/
│   ├── channelRoutes.js
│   ├── userRoutes.js
│   └── videoRoutes.js
│
├── uploads/
│   └── videos/
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---

# ✨ Features

# 🔐 Authentication Features

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Token Verification Middleware

---

# 🎥 Video Features

- Upload YouTube Videos
- Upload Videos from Device
- Edit Uploaded Videos
- Delete Uploaded Videos
- Get All Videos
- Get Single Video by ID
- Get Logged-in User Videos

---

# 💬 Like/Dislike Features

- Like selected video
- Dislike selected video

---

# 💬 Comment Features

- Upload Comment
- Edit Comment
- Delete Comment
- Populate Comment User Names

---

# 📺 Channel Features

- Create Channel
- Get Logged-in User Channel
- Channel Validation

---

# 📂 File Upload Features

- Video Upload using Multer
- Dynamic File Naming
- Static File Serving
- Upload Storage Management

---

# 🛡️ Validation Features

- Email Validation
- Password Strength Validation
- Name Validation
- Login Validation Middleware

---

# ⚙️ Installation

# 1. Clone Repository

```bash
git clone https://github.com/hds05/Youtube_clone_Backend.git
```

---

# 2. Move into Backend Folder

```bash
cd Youtube_backEnd
```

---

# 3. Install Dependencies

```bash
npm install
```

---

# 4. Create .env File

Create a `.env` file in root folder.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_secret=your_secret_key
```

---

# 5. Start Server

```bash
npm run dev
```

or

```bash
npm start
```

---

# 📦 Main Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.18.0",
  "multer": "^2.0.2"
}
```

---

# 🛠️ API Endpoints

# 🔐 Authentication Routes

## Register User

```http
POST /register
```

### Request Body

```json
{
  "name": "hds",
  "email": "hds@gmail.com",
  "password": "Hds@1234"
}
```

---

## Login User

```http
POST /login
```

### Request Body

```json
{
  "email": "hds@gmail.com",
  "password": "Hds@1234"
}
```

---

# 🎥 Video Routes

## Get All Videos

```http
GET /videos
```

---

## Get Video By ID

```http
GET /video/:id
```

---

## Upload Video

```http
POST /upload
```

### Protected Route

### FormData

```bash
title
description
category
thumbnailUrl
videoType
videoUrl    # If using thunderClient and videoType is youtube, paste video id
```

---

## Edit Video

```http
PUT /video/:id/edit
```

### Protected Route

---

## Delete Video

```http
DELETE /video/:id
```

### Protected Route

---

## Get My Videos

```http
GET /myvideos
```

### Protected Route

---

# 💬 Comment Routes

## Upload Comment

```http
POST /video/:id/uploadComment
```

---

## Edit Comment

```http
PUT /video/:id/editComment
```

---

## Delete Comment

```http
DELETE /video/:id/deleteComment
```

---

# 📺 Channel Routes

## Create Channel

```http
POST /create
```

---

## Get My Channel

```http
GET /mychannel
```

---

# 🔒 Authentication Flow

1. User registers or logs in
2. JWT token gets generated
3. Token sent to frontend
4. Frontend stores token
5. Protected routes verify token
6. Authorized user gets access

---

# 🧠 Database Models

# User Model

- name
- email
- password

---

# Channel Model

- userId
- channelName
- description
- channelIcon
- subscribers

---

# Video Model

- title
- description
- category
- thumbnailUrl
- videoType
- videoUrl
- userId
- uploader
- channelId
- channelName
- channelIcon
- views
- likes
- dislikes
- uploadDate
- subscribers
- comments

---

# 📤 Multer File Upload

Uploaded videos are stored inside:

```bash
uploads/videos
```

Static serving enabled using:

```js
app.use("/uploads", express.static("uploads"))
```

---

# 🔐 Protected Routes

Protected routes use JWT middleware:

```js
Authorization: Bearer <token>
```

---

# 🚧 Future Improvements

- Subscribe System
- Watch History
- Playlists
- Real-time Notifications
- Socket.IO Integration
- Live Streaming
- Shorts Feature
- Video Recommendations
- Cloudinary Integration
- Video Compression
- Pagination
- Search Optimization

---

# 🐞 Known Issues

- No real-time features yet
- No cloud storage integration
- Notifications not implemented
- No streaming optimization yet

---

# 👨‍💻 Author

## Himanshu Dutt Sharma

---

# 📄 License

This project is created for learning and educational purposes.
