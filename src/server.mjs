import express from "express"
import healthRouter from "./infrastructure/http/routes/health.router.mjs"
import { port } from "./config/env.mjs"
import { errorHandler } from "./infrastructure/http/middleware/errorHandler.mjs"
import { AppError, NotFoundError, PropertyError } from "./shared/errors/AppError.mjs"
import { pool } from "./infrastructure/db/db.mjs"
import authRouter from "./infrastructure/http/routes/auth.routes.mjs"

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",healthRouter)
app.use("/api/v1/auth",authRouter)


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

