import express from "express";
import auth from "../middlewares/auth.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import upload from "../middlewares/upload.js";
import { uploadEventBanner } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", auth, createEvent); // Create event (protected)
router.get("/", getAllEvents); // List all events
router.get("/:id", getEventById); // Get event by ID
router.put("/:id", auth, updateEvent); // Update event (creator only)
router.delete("/:id", auth, deleteEvent); // Delete event
router.post("/:id/upload", auth, upload.single("banner"), uploadEventBanner);

export default router;
