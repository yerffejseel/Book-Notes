import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD
});

db.connect();

db.on('connect', () => console.log('DB connected'))

export default db;