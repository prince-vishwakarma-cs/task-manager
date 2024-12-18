import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utilities/helper.js";
import userRoutes from "./routes/user.js"
import taskRoutes from "./routes/task.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import "./services/scheduler.js"

const app=express()
dotenv.config()

const Port=process.env.PORT
const mongo_uri=process.env.MONGO_URI

connectDB(mongo_uri,"Task_manager")
app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use("/user",userRoutes)
app.use("/task",taskRoutes)

app.get("/",(req,res)=>res.send("Server is Working"))

app.listen(Port,()=>{
    console.log(`Server is working on port : ${Port}`)
})