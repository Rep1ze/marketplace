import express from "express"
import { RegisterGet, RegisterPost } from "../controllers/auth.controller.mjs"

const authRouter = express.Router()

authRouter.post("/register",RegisterPost)
authRouter.get("/register",RegisterGet)


export default authRouter