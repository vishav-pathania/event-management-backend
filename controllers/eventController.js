import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, location, startTime, endTime, maxParticipants } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      location,
      startTime,
      endTime,
      maxParticipants,
      createdBy: req.user.userId
    });

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event", error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(event, req.body);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err.message });
  }
};


export const uploadEventBanner = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
  
      if (!event) return res.status(404).json({ message: "Event not found" });
  
      if (event.createdBy.toString() !== req.user.userId)
        return res.status(403).json({ message: "Unauthorized" });
  
      event.bannerUrl = `/uploads/${req.file.filename}`;
      await event.save();
  
      res.status(200).json({ message: "Banner uploaded", bannerUrl: event.bannerUrl });
    } catch (err) {
      res.status(500).json({ message: "Upload failed", error: err.message });
    }
  };
