import express from "express";
import { connectDB } from "./config/DB.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

await connectDB().catch((err) => {
  console.error("Failed to connect to the database:", err);
  process.exit(1);
});
console.log("✅ Database connection established");
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});