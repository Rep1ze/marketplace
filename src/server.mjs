import express from "express"
import healthRouter from "./infrastructure/http/routes/health.router.mjs"
import { port } from "./config/env.mjs"
import { errorHandler } from "./infrastructure/http/middleware/errorHandler.mjs"
import { AppError, NotFoundError, PropertyError } from "./shared/errors/AppError.mjs"

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",healthRouter)
app.all('{*splat}',(req,res,next)=>{
   throw new NotFoundError("Страница не найдена")
})
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server listen on http://localhost:${port}`)
})
