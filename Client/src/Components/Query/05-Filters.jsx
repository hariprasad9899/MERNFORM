import React, { useEffect } from "react";
import "./05-FiltersStyle.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { addbook } from "../Body/bookSlice";

export default function Filters() {
    let dispatch = useDispatch();

    // drop state for Filter By
    const [dropTypeFilter, setDropTypeFilter] = useState(false);
    // drop state for Query By
    const [dropQueryFilter, setDropQueryFilter] = useState(false);

    // state for filter type val
    const [filterTypeVal, setFilterTypeVal] = useState("Filter by");

    // state for filter query val
    const [filterQueryVal, setFilterQueryVal] = useState("Choose Query");

    // state for input box val
    const [inputVal, setInputVal] = useState("");

    // state for data val
    const [dataTypeVal, setDataTypeVal] = useState("");
    const [dataQueryVal, setDataQueryVal] = useState("");

    const updateTypeClickVal = () => {
        setDropTypeFilter(!dropTypeFilter);
        setDropQueryFilter(false);
    };

    const updateQueryClickVal = () => {
        setDropQueryFilter(!dropQueryFilter);
        setDropTypeFilter(false);
    };

    let queryObj = {
        gte: "Greater Than or Equal To",
        eq: "Equal To",
        lte: "Less Than or Equal To",
    };

    const updateQueryVal = (type) => {
        setFilterQueryVal(queryObj[type]);
        setDropQueryFilter(false);
        setDataQueryVal(type);
    };

    let typeObj = {
        year: "Year",
        rent: "Rent",
        buy: "Buy",
    };

    const updateTypeVal = (type) => {
        setFilterTypeVal(typeObj[type]);
        setDropTypeFilter(false);
        setDataTypeVal(type);
    };

    const updateInputVal = (val) => {
        setInputVal(val);
    };

    let rackData = useSelector((state) => state.bookdata.bookrack);

    const fetchResult = () => {
        if (filterTypeVal != "Filter by" && filterQueryVal != "Choose Query") {
            let options = {
                method: "get",
                params: {
                    unit: dataQueryVal,
                    val: inputVal,
                    type: filterTypeVal.toLowerCase(),
                },
                url: "http://localhost:3001/filterBooks",
            };

            Axios.request(options).then((res) => {
                console.log(res);
                dispatch(addbook([...res.data]));
            });
        }
    };

    return (
        <div className="filter-book">
            <div className="input-box">
                <div className={dropTypeFilter ? `dropdown-type drop-section show-drop` : `dropdown-type drop-section`}>
                    <p className="filter-text" onClick={() => updateTypeClickVal()}>
                        {filterTypeVal}
                    </p>
                    <div className="drop-content">
                        <p onClick={() => updateTypeVal("year")}>Year</p>
                        <p onClick={() => updateTypeVal("rent")}>Rent</p>
                        <p onClick={() => updateTypeVal("buy")}>Buy</p>
                    </div>
                </div>
                <div
                    className={
                        dropQueryFilter ? `dropdown-filter drop-section show-drop` : `dropdown-filter drop-section`
                    }
                >
                    <p className="filter-text" onClick={() => updateQueryClickVal()}>
                        {filterQueryVal}
                    </p>
                    <div className="drop-content">
                        <p onClick={() => updateQueryVal("gte")}>Greater Than or Equal To</p>
                        <p onClick={() => updateQueryVal("eq")}>Equal To</p>
                        <p onClick={() => updateQueryVal("lte")}>Less Than or Equal To</p>
                    </div>
                </div>
                <div className="input-val">
                    <input type="text" value={inputVal} onChange={(e) => updateInputVal(e.target.value)} />
                </div>
                <div className="find-query">
                    <button onClick={() => fetchResult()}>Find</button>
                </div>
            </div>
        </div>
    );
}
