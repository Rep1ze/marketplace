import path from "node:path"
import { ValidationError } from "../../../shared/errors/AppError.mjs"
const __dirname = import.meta.dirname
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { pool } from "../../db/db.mjs"

class classUser {
    constructor(name,email,password){
        this.name = name
        this.email = email
        this.password = password
    }
}

function signToken({ id, email, roles }) {
  return jwt.sign({ sub: id, email, roles }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

export const RegisterPost = async(req,res)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^[A-Za-z]\w{7,14}$/ // пароль от 6 до 15 символов начиная с заглавной буквы + числа
        if(!emailRegex.test(req.body.email)){
            throw new ValidationError("Email not valid")
        }
        if(!passwordRegex.test(req.body.password)){
            throw new ValidationError("password not valid")
        }
        const hash = await bcrypt.hash(req.body.password,10)
        const newUser = new classUser(req.body.name,req.body.email,hash)
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const { rows } = await client.query(
            `INSERT INTO users (email, password_hash, full_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, full_name, created_at`,
            [newUser.email.toLowerCase(), newUser.password, newUser.name]
            );
            const user = rows[0];

            const roleResult = await client.query(
            `INSERT INTO user_roles (user_id, role_id)
            SELECT $1, id FROM roles WHERE name = 'user'`,
            [user.id]
            )
            if (roleResult.rowCount === 0) {
            throw new Error("Роль 'user' не найдена в таблице roles")
            }
            await client.query('COMMIT')
            const roles = ['user']
            return res.status(201).json({ user: { ...user, roles }, token: signToken({ ...user, roles }) })
        } catch (err) {
            await client.query('ROLLBACK');
            if (err.code === '23505') {
            return res.status(409).json({ error: 'Email уже зарегистрирован' })
            }
            console.error(err)
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        } finally {
            client.release()
        }
}
export const LoginPost = async(req,res)=>{
        if(!req.body.email || !req.body.password){
            throw new ValidationError("Email and password required")
        }
        try {
            const { rows } = await pool.query(
            `SELECT u.id, u.email, u.password_hash, u.full_name,
            COALESCE(array_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '{}') AS roles
            FROM users u
            LEFT JOIN user_roles ur ON ur.user_id = u.id
            LEFT JOIN roles r ON r.id = ur.role_id
            WHERE u.email = $1
            GROUP BY u.id`,
            [req.body.email.toLowerCase()]
            )
            const user = rows[0]
            const isValid = user && await bcrypt.compare(req.body.password,user.password_hash)
            if (!isValid) {
                return res.status(401).json({ error: "Неверный email или пароль" })
            }
            return res.json({
                user: { id: user.id, email: user.email, full_name: user.full_name, roles: user.roles },
                token: signToken(user)
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
}

export const IndexGet = (req,res)=>{
    try{
        res.sendFile(path.join(__dirname + "..","..","..", "..", "/public/index.html"))
    }
    catch(e){
        console.log(e)
    }
}

export const LoginGet = (req,res)=>{
    try{
        res.sendFile(path.join(__dirname + "..","..","..", "..", "/public/login.html"))
    }
    catch(e){
        console.log(e)
    }
}

export const CreateGet = (req,res)=>{
    try{
        res.sendFile(path.join(__dirname + "..","..","..", "..", "/public/create.html"))
    }
    catch(e){
        console.log(e)
    }
}

export const RegisterGet = (req,res)=>{
    try{
        res.sendFile(path.join(__dirname + "..","..","..", "..", "/public/register.html"))
    }
    catch(e){
        console.log(e)
    }
}