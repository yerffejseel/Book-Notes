import React, { useState } from "react";

function Form(props) {
    const [form, setForm] = useState(true)
    const [text, setText] = useState({
        title: "",
        isbn: "",
        notes: "",
        rating: "Select a rating"
    })
    let books;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleClick = (e) => {
        setForm(!form)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setText(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div>
            <button onClick={handleClick} id="form-btn" className="button" style={form ? {display: "block"} : {display: "none"}}>Write Entry</button>
            <form id="form" style={form ? {display: "none"} : {display: "flex"}} onSubmit={(e) => {
                e.preventDefault();
                props.handleSubmit(text);
                setForm(!form)
                setText({
                    title: "",
                    isbn: "",
                    notes: "",
                    rating: "Select a rating"
                })
            }}>
                <input required type="text" placeholder="Book Title" name="title" className="box" onChange={handleChange} value={text.title}/>
                <input required type="text" name="isbn" placeholder="Enter ISBN" className="box" onChange={handleChange} value={text.isbn}/>
                <textarea required name="notes" placeholder="Notes" className="box" id="notes" onChange={handleChange} value={text.notes}></textarea>
                <select required name="rating" className="box" onChange={handleChange} value={text.rating}>
                    <option disabled selected>Select a rating</option>
                    {arr.map(num => (<option value={num}>{num}</option>))}
                </select>
                <div id="btn-container">
                    <input type="button" onClick={handleClick} value="Cancel" className="button" style={{backgroundColor: "rgb(255, 115, 115)", color: "white"}} />
                    <input type="submit" value="Submit" className="button" id="submit" />
                </div>     
            </form>
        </div>
    );
}

export default Form;