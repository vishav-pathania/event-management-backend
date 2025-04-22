import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";

import connectDB from "./config/db.js";
import auth from "./middlewares/auth.js";

import eventRoutes from "./routes/eventRoutes.js";

import path from "path";
import { fileURLToPath } from "url";
import { startCronJobs } from "./utils/cronJobs.js";

dotenv.config();

if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

connectDB();

const app = express();
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/auth", authRoutes);

app.get("/protected", auth, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Test Route
app.get("/", (req, res) => {
  res.send("Event Management Backend is running");
});

app.use("/events", eventRoutes);

// __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


startCronJobs();
