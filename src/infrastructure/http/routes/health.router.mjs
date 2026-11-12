import express from "express"
import { healthGet } from "../controllers/health.controllers.mjs"

const healthRouter = express.Router()

healthRouter.get("/health",healthGet)

export default healthRouter