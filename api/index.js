import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";

const app = express();
const __dirname = path.resolve(); // get absolute path for current directory

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://copy-2-8.onrender.com", // deployed frontend
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads")); // store in backend/uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  const imageUrl = `https://copy-2-5.onrender.com/uploads/${file.filename}`; // replace with your actual backend URL
  res.status(200).json(imageUrl);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Start server
app.listen(8800, () => {
  console.log("Connected!");
});
