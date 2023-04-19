import React, { useEffect, useState } from "react";
import "./03-SearchResultStyle.scss";
import { useSelector } from "react-redux";
import data from "./sample";
import Bookcard from "./02-Bookcard";
import Axios from "axios";

export default function SearchResult() {
    let pilot = data;

    // let [searchResult, setSearchResult] = useState(pilot);

    let searchResult = useSelector((state) => state.searchdata.searchrack);
    let searchStatus = useSelector((state) => state.querydata.searchquery.startsearch);

    console.log(searchStatus);

    return (
        <div className="search-result">
            <h2 className="head-name">Search Result</h2>
            <div className="inner-div">
                {searchResult.map((item) => (
                    <Bookcard data={item} key={item._id} />
                ))}
            </div>
            {/* {searchStatus ? <h1>Search Started</h1> : null} */}
        </div>
    );
}
