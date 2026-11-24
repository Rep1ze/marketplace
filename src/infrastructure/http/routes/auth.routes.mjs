import express from "express"
import { CreateGet, IndexGet, LoginGet, LoginPost, RegisterGet, RegisterPost } from "../controllers/auth.controller.mjs"
const authRouter = express.Router()

export const authPages = express.Router()
authPages.get("/login",LoginGet)
authPages.get("/register",RegisterGet)
authPages.get("/create",CreateGet)

export const authApi = express.Router()
authApi.post("/login",LoginPost)
authApi.post("/register",RegisterPost)


