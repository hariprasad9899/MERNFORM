import React from "react";
import "./05-FiltersStyle.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Filters() {
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
        gt: "Greater Than or Equal To",
        eq: "Equal To",
        lt: "Less Than or Equal To",
    };

    const updateQueryVal = (type) => {
        setFilterQueryVal(queryObj[type]);
        setDropQueryFilter(false);
        setDataQueryVal(type);
        console.log(dataQueryVal);
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
        console.log(dataTypeVal);
    };

    const updateInputVal = (val) => {
        setInputVal(val);
    };

    const fetchResult = () => {};

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
                        <p onClick={() => updateQueryVal("gt")}>Greater Than or Equal To</p>
                        <p onClick={() => updateQueryVal("eq")}>Equal To</p>
                        <p onClick={() => updateQueryVal("lt")}>Less Than or Equal To</p>
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
