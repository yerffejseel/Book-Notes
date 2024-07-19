import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;
const APIURL = "https://covers.openlibrary.org/b/isbn/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "book notes",
    password: "Ninjanerd12",
    port: 5432
})

db.connect();

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async (req, res) => {
    const isbn = req.body["isbn"];
    try {
        const response = await axios.get(APIURL + isbn + ".json");
        const sourceURL = response.data.source_url;
        try {
            
        } catch(err) {

        }
    } catch(err) {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});