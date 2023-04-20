import React, { useEffect, useState } from "react";
import "./03-SearchResultStyle.scss";
import { useSelector, useDispatch } from "react-redux";
import data from "./sample";
import Bookcard from "./02-Bookcard";
import Axios from "axios";
import { searchbook } from "./searchSlice";

export default function SearchResult() {
    let pilot = data;

    // let [searchResult, setSearchResult] = useState(pilot);

    let searchResult = useSelector((state) => state.searchdata.searchrack);
    let searchStatus = useSelector((state) => state.querydata.searchquery.startsearch);
    let dispatch = useDispatch();

    let searchquery = useSelector((state) => state.querydata.searchquery);

    useEffect(() => {
        if (searchStatus) {
            Axios.get("http://localhost:3001/findBooks", searchquery).then((res) => {
                console.log()
                dispatch(searchbook([...searchResult, ...res.data]));
            });
        }
    }, []);

    return (
        <div className="search-result">
            <h2 className="head-name">Search Result</h2>
            <div className="inner-div">
                {searchResult.map((item) => (
                    <Bookcard data={item} key={item._id} />
                ))}
            </div>
            {searchStatus ? <h1>Search Started</h1> : null}
        </div>
    );
}
