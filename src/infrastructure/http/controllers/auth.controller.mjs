import path from "node:path"
import { ValidationError } from "../../../shared/errors/AppError.mjs"
const __dirname = import.meta.dirname
import bcrypt from "bcrypt"
class classUser {
    constructor(name,email,password){
        this.name = name
        this.email = email
        this.password = password
    }
}
const users = []

export const RegisterPost = (req,res)=>{
    try{
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/
        const passwordRegex = /^[A-Za-z]\w{7,14}$/ // Check a password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter
        const hash = bcrypt.hash(req.body.password,10,(err,hash)=>{
            const newUser = new classUser(req.body.name,req.body.email,hash)
            if(!emailRegex.test(req.body.email)){
                throw new ValidationError("Email not valid")
            }
            if(!passwordRegex.test(req.body.password)){
                throw new ValidationError("password not valid")
            }
            users.push(newUser)
            res.status(201).json(users)
        })
    }
    catch(e){
        console.log(e)
    }
}
export const RegisterGet = (req,res)=>{
    try{
        res.sendFile(path.join(__dirname + "/test.html"))
    }
    catch(e){
        console.log(e)
    }
}