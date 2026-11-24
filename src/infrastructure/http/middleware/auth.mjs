import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../../../shared/errors/AppError.mjs"
export const checkAuth = (req,res,next)=>{
        const header = req.headers.authorization
        if(!header || !header.startsWith("Bearer ")){
            throw new UnauthorizedError("нужна авторизация")
        }
        const token = header.split(" ")[1]
        try {
            req.user = jwt.verify(token,process.env.JWT_SECRET)
            next()
        } catch (err) {
            throw new UnauthorizedError("Неверный или просроченный токен")
        }
}