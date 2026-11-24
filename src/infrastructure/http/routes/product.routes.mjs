import express from "express"
import { ProductPost, ProductsGet } from "../controllers/product.controllers.mjs"
import { checkAuth } from "../middleware/auth.mjs"

const productRoutes = express.Router()

productRoutes.get("/",ProductsGet)
productRoutes.post("/",checkAuth,ProductPost)

export default productRoutes