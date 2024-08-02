import React from "react";
import Heading from "./Heading";
import Form from "./Form";

function Header(props) {
    return (
    <div id="header">
        <Heading />
        <Form handleSubmit={props.handleSubmit}/>
    </div>);
}

export default Header;