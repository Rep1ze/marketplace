import express from "express"
import { CategoryPost } from "../controllers/category.controllers.mjs"

const categoryRoutes = express.Router()

categoryRoutes.post("/",CategoryPost)

export default categoryRoutes