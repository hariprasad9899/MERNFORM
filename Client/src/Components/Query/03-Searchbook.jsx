import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchbooktype } from "./querySlice";

export default function Searchbook() {
    let placeHolder = "Search By";
    let [searchType, setSearchType] = useState(placeHolder);
    let [inputVal, setInputVal] = useState("");
    let [drop, setDrop] = useState(false);
    let dispatch = useDispatch();

    const dropMe = (val) => {
        setSearchType(val);
        setDrop(false);
    };

    let searchStatus = useSelector((state) => state.querydata.searchquery);

    const submitSearch = () => {
        console.log("submit triggered");
        if (inputVal.length > 0) {
            if (searchType !== placeHolder) {
                dispatch(searchbooktype({ type: searchType, startsearch: true, startsearch: inputVal }));
                console.log(searchStatus);
            }
        } else {
            alert("Please type any value to search!");
        }
    };

    return (
        <div className="search-book">
            <div className="input-box">
                <div className="dropdown" onClick={() => setDrop(!drop)}>
                    <p className="search-text">{searchType}</p>
                    <div className={drop ? `drop-content` : `drop-content dropVisible`}>
                        <p onClick={() => dropMe("Author")}>Author</p>
                        <p onClick={() => dropMe("Year")}>Year</p>
                        <p onClick={() => dropMe("Book Name")}>Book Name</p>
                    </div>
                </div>
                <input
                    type="text"
                    className="search-input-box"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                />
                <button onClick={() => submitSearch()}>Search Book</button>
            </div>
        </div>
    );
}
