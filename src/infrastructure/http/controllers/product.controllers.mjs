import { ValidationError } from "../../../shared/errors/AppError.mjs";
import { pool } from "../../db/db.mjs";

export const ProductPost = async(req,res)=>{
        const price = Number(req.body.price)
        if(!req.body.name || !req.body.category_id){
            throw new ValidationError("Name and category_id required")
        }
        if(isNaN(price) || price < 0){
            throw new ValidationError("Price not valid")
        }
        try {
            const { rows } = await pool.query(
            `INSERT INTO products (name, description, price, category_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [req.body.name, req.body.description, price, req.body.category_id]
            )
            return res.status(201).json(rows[0])
        } catch (err) {
            
            if (err.code === '23503') {
                throw new ValidationError("Такой категории не существует")
            }
            console.error(err)
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
}

export const ProductsGet = async(req,res)=>{
        try {
            const { rows } = await pool.query(`SELECT * FROM products`)
            return res.status(200).json(rows)
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
}