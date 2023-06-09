import React, { useEffect, useState } from "react";
import "./03-SearchResultStyle.scss";
import { useSelector, useDispatch } from "react-redux";
import data from "./sample";
import Bookcard from "./02-Bookcard";
import Axios from "axios";
import { searchbook, clearsearch } from "./searchSlice";
import { close } from "./closeSlice";
import { resetsearch } from "../Query/querySlice";

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
        url: "https://librarydata.onrender.com/findBooks",
    };

    useEffect(() => {
        if (searchStatus) {
            dispatch(clearsearch());
            Axios.request(options).then((res) => {
                dispatch(searchbook(res.data));
            });
            dispatch(resetsearch());
        }
    }, [searchStatus]);

    const updateSearchDiv = () => {
        dispatch(close());
        dispatch(clearsearch());
        dispatch(resetsearch());
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
            {searchStatus ? <h1>Searching....</h1> : null}
        </div>
    );
}
