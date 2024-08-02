import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import Notes from "./Notes";

const URL = "http://localhost:3000"

function App() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(URL + "/books");
                console.log(response.data.books);
                setBooks(response.data.books);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchBooks();
    }, []);

    const handleSubmit = async (text) => {
        try {
            const response = await axios.post(URL + "/isbn", text);
            setBooks(response.data.books);
        } catch (err) {
            console.log(err);
        }
    }

    return <div id="main">
        <Header handleSubmit={handleSubmit}/>
        <Notes books={books} delBooks={setBooks}/>
    </div>
}

export default App;