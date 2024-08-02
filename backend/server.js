import express from "express";
import path from "path"
import { fileURLToPath } from "url";
import router from "./routes/notes.js";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json())


app.use("/", router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});