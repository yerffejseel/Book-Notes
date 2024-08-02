import express from "express";
import { getBooks, addBook, deleteBook } from "../controllers/controllers.js"

const router = express.Router();

router.get("/books", getBooks);
router.post("/isbn", addBook);
router.post("/delete/:id", deleteBook);

export default router;