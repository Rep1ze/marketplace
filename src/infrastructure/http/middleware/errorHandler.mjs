import { AppError, NotFoundError, PropertyError, ValidationError } from "../../../shared/errors/AppError.mjs"
import fs from "node:fs/promises"
import path from "node:path"
const __dirname = import.meta.dirname

export const errorHandler = async(err,req,res,next)=>{
    if(err instanceof AppError){
        const date = new Date()
       await fs.appendFile(path.join(__dirname + "/error.txt"),(String(date.toISOString() + " " + err.stack + "\n\n")))
       console.log(err)
       return res.status(err.statusCode).json({error : err.message })
        
    }else{
        res.status(500).json({error: "Internal Server Error"})
        console.log(err)
    }
}



