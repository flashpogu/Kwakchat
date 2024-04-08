import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Mongo is connected :)");
});
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 9000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});