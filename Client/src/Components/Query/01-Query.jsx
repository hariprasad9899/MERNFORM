import React from "react";
import "./01-QueryStyle.scss";
import Addbook from "./02-Addbook";
import Searchbook from "./03-Searchbook";
import Collections from "../Body/01-Collections";

export default function Query() {
    return (
        <div className="book-entrance">
            <Addbook />
            <Searchbook />
        </div>
    );
}
