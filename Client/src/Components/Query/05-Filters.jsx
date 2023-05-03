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
        setInputVal("");
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
        setInputVal("");
    };

    const updateInputVal = (val) => {
        setInputVal(val);
    };

    let rackData = useSelector((state) => state.bookdata.bookrack);
    let [filterBook, setFilterBook] = useState(false);

    const fetchResult = () => {
        setFilterBook(true);
    };

    useEffect(() => {
        if (filterBook) {
            if (
                filterTypeVal != "Filter by" &&
                filterQueryVal != "Choose Query" &&
                filterTypeVal.length > 0 &&
                filterQueryVal.length > 0
            ) {
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
                    dispatch(addbook([...res.data]));
                    setFilterBook(false);
                });
            }
        }
    }, [filterBook]);

    const [resetBooks, setResetBooks] = useState(false);
    const handleReset = () => {
        setResetBooks(true);
    };

    useEffect(() => {
        if (resetBooks) {
            Axios.get("http://localhost:3001/getBooks").then((res) => {
                dispatch(addbook([...res.data]));
                setResetBooks(true);
            });
        }
    }, [resetBooks]);

    return (
        <div className="filter-book">
            <div className="input-box">
                <div className={dropTypeFilter ? `dropdown-type drop-section show-drop` : `dropdown-type drop-section`}>
                    <p className="filter-text" onClick={() => updateTypeClickVal()}>
                        {filterTypeVal}
                    </p>
                    <div className="drop-content">
                        {Object.entries(typeObj).map((item, index) => {
                            return (
                                <p key={index} onClick={() => updateTypeVal(item[0])}>
                                    {item[1]}
                                </p>
                            );
                        })}
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
                        {Object.entries(queryObj).map((item, index) => {
                            return (
                                <p key={index} onClick={() => updateQueryVal(item[0])}>
                                    {item[1]}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className="input-val">
                    <input type="text" value={inputVal} onChange={(e) => updateInputVal(e.target.value)} />
                </div>
                <div className="find-query">
                    <button onClick={() => fetchResult()}>Find</button>
                </div>
                <div className="find-query">
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}
