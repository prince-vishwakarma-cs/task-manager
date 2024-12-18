import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: String, ref: "User", required: true },
  due: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  notified: { type: Boolean, default: false },
});

schema.virtual("timeLeft").get(function() {
  const now = new Date()
  const timeLeftMillis = this.due - now

  if (timeLeftMillis <= 0) {
    return -1
  }

  const timeLeft = Math.floor(timeLeftMillis / 1000)
  return timeLeft
});

const Task = mongoose.model("Task", schema)

export default Task
