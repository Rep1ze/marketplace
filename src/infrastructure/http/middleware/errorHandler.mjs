

import { AppError, NotFoundError, PropertyError, ValidationError } from "../../../shared/errors/AppError.mjs"

export const errorHandler = (err,req,res,next)=>{
    if(err instanceof AppError){
       res.status(err.statusCode).json(`error : ${err.message}` )
       console.log(err)
    }else{
        res.status(500).json({error: "Internal Server Error"})
        console.log(err)
    }
}

