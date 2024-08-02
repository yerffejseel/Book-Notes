import React from "react";
import axios from "axios";

const URL = "http://localhost:3000";

function Notes(props) {
    const handleDelete = async (e) => {
        e.preventDefault();
        const { deleteItemID } = e.target.elements;
        const value = deleteItemID.value;
        console.log(value);
        try {
            const response = await axios.post(URL + "/delete/" + value);
            props.delBooks(response.data.books);
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div id="notes-container">
            <h2>All Notes</h2>
            {props.books.map(entry => (
                <div className="book-review" key={entry.id}>
                    <h3>{entry.title} : {entry.rating}/10</h3>
                    <div className="content">
                        <img src={entry.url} alt={entry.url} />
                        <p>{entry.notes}</p>
                    </div>
                    <form onSubmit={handleDelete}>
                        <input type="hidden" value={entry.id} name="deleteItemID"/>
                        <button type="submit" name="delete-btn" className="button" id="delete-btn" >Delete</button>
                    </form>
                </div>
            ))}
        </div>
    );
}

export default Notes;