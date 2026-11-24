import { ValidationError } from "../../../shared/errors/AppError.mjs";
import { pool } from "../../db/db.mjs";

export const CategoryPost = async(req,res)=>{
        if(!req.body.name){
            throw new ValidationError("Name required")
        }
        try {
            const { rows } = await pool.query(
            `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
            [req.body.name]
            )
            return res.status(201).json(rows[0])
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
}