import cron from "node-cron";
import { sendMail } from "../utils/mailer.js";
import Task from "../models/task.js";

const notifyUser = async () => {
  try {
    let count=0
    const tasks = await Task.find({ status: "Pending" }).populate("owner");
    tasks.forEach(async (task) => {
      if (task.timeLeft >= 0 && task.timeLeft <= 1800 && !task.notified) {
        count+=1
        console.log(
          `Title: ${task.title} TimeLeft: ${Math.floor(task.timeLeft/60)} minutes, Email :${task.owner.email}`
        );
        sendMail(task.owner.email, task);

        task.notified = true;
       await task.save();
      }
    });
    console.log(`Notifications sent ${count} tasks due in the next 30 minutes.`);
  } catch (err) {
    console.error("Error notifying users:", err);
  }
};

cron.schedule("* * * * *", () => {
  console.log("Checking for tasks with approaching due times...");
  notifyUser();
});