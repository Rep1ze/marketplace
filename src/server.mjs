import express from "express"
import healthRouter from "./infrastructure/http/routes/health.router.mjs"
import { port } from "./config/env.mjs"
import { errorHandler } from "./infrastructure/http/middleware/errorHandler.mjs"
import { AppError, NotFoundError, PropertyError } from "./shared/errors/AppError.mjs"
import { pool } from "./infrastructure/db/db.mjs"
import  { authApi, authPages } from "./infrastructure/http/routes/auth.routes.mjs"
import categoryRoutes from "./infrastructure/http/routes/category.routes.mjs"
import productRoutes from "./infrastructure/http/routes/product.routes.mjs"
const __dirname = import.meta.dirname
import path from "node:path"
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))
app.use("/api/v1",healthRouter)
app.use("/api/v1/auth",authApi)
app.use("/api/v1/categories",categoryRoutes)
app.use("/api/v1/products",productRoutes)
app.use("/",authPages)

pool.query('SELECT NOW()',(err,res)=>{
    if(err){
        console.log(err)
    }else{
        console.log("data base connected", res.rows)
    }
})

app.all('{*splat}',(req,res)=>{
   throw new NotFoundError("Страница не найдена")
})
app.use(errorHandler)



app.listen(port,()=>{
    console.log(`server listen on http://localhost:${port}`)
})

