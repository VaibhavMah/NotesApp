import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import notesRouter from "./routes/notes";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

if (!mongoURI) {
  throw new Error("MONGO_URI is not defined in environment variables!");
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
