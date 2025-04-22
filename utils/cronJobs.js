import cron from "node-cron";
import Event from "../models/Event.js";

const eventReminderJob = cron.schedule("* * * * *", async () => {
  console.log("reminderjob---------->");
  const now = new Date();
  const fiveMinsLater = new Date(now.getTime() + 5 * 60000);
  console.log("-----------------");
  console.log("NOW:", now.toISOString());
  console.log("FIVE MINS LATER:", fiveMinsLater.toISOString());
  const upcomingEvents = await Event.find({
    startTime: { $gte: now, $lte: fiveMinsLater },
  });
  console.log("upcoming events------>", upcomingEvents);

  upcomingEvents.forEach((event) => {
    console.log(
      `Reminder: Event "${event.title}" is starting at ${event.startTime}`
    );
  });
});

const eventStatusUpdaterJob = cron.schedule("*/10 * * * *", async () => {
  console.log("statusUpdaterjob---------->");
  const now = new Date();

  const events = await Event.find();
  console.log("upcoming events status------>", events);

  for (let event of events) {
    if (
      event.status === "upcoming" &&
      now >= event.startTime &&
      now < event.endTime
    ) {
      await Event.findByIdAndUpdate(event._id, { status: "ongoing" });
      console.log(`Status updated to "ongoing" for event: ${event.title}`);

    }

    if (event.status === "ongoing" && now >= event.endTime) {
      event.status = "completed";
      await Event.findByIdAndUpdate(event._id, { status: "completed" });
      console.log(`Status updated to "completed" for event: ${event.title}`);
    }
  }
});

export const startCronJobs = () => {
  console.log("Cron function called----------->");
  eventReminderJob.start();
  eventStatusUpdaterJob.start();
};
