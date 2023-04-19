import React, { useState } from "react";

export default function Searchbook() {
    let [searchText, setInitSearch] = useState("Search By");
    let [drop, setDrop] = useState(false);

    const dropMe = (val) => {
        setInitSearch(val);
        setDrop(false);
    };

    

    return (
        <div className="search-book">
            <div className="input-box">
                <div className="dropdown" onClick={() => setDrop(!drop)}>
                    <p className="search-text">{searchText}</p>
                    <div className={drop ? `drop-content` : `drop-content dropVisible`}>
                        <p onClick={() => dropMe("Author")}>Author</p>
                        <p onClick={() => dropMe("Year")}>Year</p>
                        <p onClick={() => dropMe("Book Name")}>Book Name</p>
                    </div>
                </div>
                <input type="text" className="search-input-box" />
                <button>Search Book</button>
            </div>
        </div>
    );
}
