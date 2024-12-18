import express from "express"
import { auth } from "../middleware/user.js"
import { getTask, newTask } from "../controllers/task.js"

const app=express.Router()

app.use(auth)
app.post("/new",newTask)
app.get("/",getTask)

export default app
