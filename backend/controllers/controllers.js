import axios from "axios";
import dotenv from "dotenv";
import db from "../db.js";

const APIURL = "https://covers.openlibrary.org/b/isbn/";

dotenv.config()

export const getBooks = async (req, res) => {
    const response = await db.query("SELECT * FROM books ORDER BY id ASC");
    const data = response.rows;
    res.json({books: data});
};

export const addBook = async (req, res) => {
    const isbn = req.body.isbn;
    try {
        const json = await axios.get(APIURL + isbn + ".json");
        const sourceURL = json.data.source_url;
        try {
            const rating = parseInt(req.body.rating);
            const notes = req.body.notes;
            const title = req.body.title;
            await db.query("INSERT INTO books (url, rating, notes, title) VALUES ($1, $2, $3, $4)",
                [sourceURL, rating, notes, title]
            );
            const response = await db.query("SELECT * FROM books ORDER BY id ASC");
            const data = response.rows;
            res.json({books: data});
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
    }
};

export const deleteBook =  async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM books WHERE id = $1", [id]);
        const response = await db.query("SELECT * FROM books ORDER BY id ASC");
        const data = response.rows;
        res.json({books: data})
    } catch (err) {
        console.log(err);
    }
};
