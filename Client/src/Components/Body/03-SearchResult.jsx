import React, { useEffect, useState } from "react";
import "./03-SearchResultStyle.scss";
import { useSelector, useDispatch } from "react-redux";
import data from "./sample";
import Bookcard from "./02-Bookcard";
import Axios from "axios";
import { searchbook, clearsearch } from "./searchSlice";
import { close } from "./closeSlice";

export default function SearchResult() {
    let pilot = data;

    // let [searchResult, setSearchResult] = useState(pilot);

    let searchResult = useSelector((state) => state.searchdata.searchrack);
    let searchStatus = useSelector((state) => state.querydata.searchquery.startsearch);
    let dispatch = useDispatch();

    let searchquery = useSelector((state) => state.querydata.searchquery);

    let options = {
        method: "get",
        params: {
            ...searchquery,
        },
        url: "http://localhost:3001/findBooks",
    };

    useEffect(() => {
        if (searchStatus) {
            Axios.request(options).then((res) => {
                dispatch(searchbook(res.data));
                
            });
        }
    }, []);

    const updateSearchDiv = () => {
        dispatch(close());
        dispatch(clearsearch());
    };

    return (
        <div className="search-result">
            <div className="heads">
                <h2 className="head-name">Search Result</h2>
                <h2 className="head-name close" onClick={() => updateSearchDiv()}>
                    &times;
                </h2>
            </div>
            <div className="inner-div">
                {searchResult.map((item) => (
                    <Bookcard data={item} key={item._id} />
                ))}
            </div>
            {searchStatus ? <h1>Search Started</h1> : null}
        </div>
    );
}
