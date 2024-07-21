import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import { password } from "./private";

const app = express();
const port = 3000;
const APIURL = "https://covers.openlibrary.org/b/isbn/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    database: "book notes",
    host: "localhost",
    port: 5432,
    password: password
});

db.connect();

app.get("/", async (req, res) => {
    const response = await db.query("SELECT * FROM books ORDER BY id ASC");
    const data = response.rows;
    res.render("index.ejs", {entries: data});
});

app.post("/isbn", async (req, res) => {
    const isbn = req.body.isbn;
    try {
        const json = await axios.get(APIURL + isbn + ".json");
        const sourceURL = json.data.source_url;
        try {
            const rating = req.body.rating;
            const notes = req.body.notes;
            const title = req.body.title;
            await db.query("INSERT INTO books (url, rating, notes, title) VALUES ($1, $2, $3, $4)",
                [sourceURL, rating, notes, title]
            );
            res.redirect("/");
        } catch(err) {
            res.redirect("/");
        }
    } catch(err) {
        res.redirect("/");
    }
});

app.post("/delete-item", async (req, res) => {
    const id = req.body.deleteItemID;
    try {
        await db.query("DELETE FROM books WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});