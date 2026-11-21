import pg from "pg"
import Pool from "pg-pool"
import dotenv from "dotenv"
dotenv.config()
export const db_name = process.env.DB_NAME
export const db_password = process.env.DB_PASSWORD
export const db_user = process.env.DB_USER
export const db_host = process.env.DB_HOST
export const db_port = process.env.DB_PORT

export const pool = new Pool({
    database: db_name,
    user: db_user,
    password: db_password,
    port: db_port,
    ssl: false,
    host:db_host
})

