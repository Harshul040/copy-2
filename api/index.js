import express from "express"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import multer from "multer";
//import path from "path";


 const app=express();
 
 app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors({
   origin: [
    'http://localhost:5173', // for local development
    'https://copy-2-8.onrender.com' // for deployed frontend
  ],
    credentials: true,  // allow cookies to be sent with cross-origin requests
  }));
  
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage})
app.post('/api/upload',upload.single('file'),function (req,res){///api/upload is the endpoint where the client sends the file for uploading.
  const file=req.file;
  res.status(200).json(file.filename);
})


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800,()=>{
    console.log("Connected!")
})
