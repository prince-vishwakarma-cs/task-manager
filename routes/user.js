import express from "express"
import { login, newUser, userinfo,logout, editInfo } from "../controllers/user.js"
import { auth } from "../middleware/user.js"

const app=express.Router()

app.post("/new",newUser)

app.post("/login",login)
app.post("/logout",logout)
app.use(auth)
app.get("/",userinfo)
app.put("/edit",editInfo)

export default app