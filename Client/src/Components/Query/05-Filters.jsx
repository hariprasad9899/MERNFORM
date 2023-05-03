import React, { useEffect } from "react";
import "./05-FiltersStyle.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { addbook } from "../Body/bookSlice";

export default function Filters() {
    let dispatch = useDispatch();

    let queryObj = {
        gte: "Greater Than or Equal To",
        eq: "Equal To",
        lte: "Less Than or Equal To",
    };

    let typeObj = {
        year: "Year",
        rent: "Rent",
        buy: "Buy",
    };

    const [filterVal, setFilterVal] = useState({
        typeVal: "Filter by",
        queryval: "Choose Query",
        typeDrop: false,
        queryDrop: false,
        queryUnit: "",
    });

    const handleDropDown = (selection) => {
        setFilterVal((t) => {
            return { ...t, typeDrop: false, queryDrop: false, [selection]: !t[selection] };
        });
    };

    const handleFilterVal = (selection) => {
        if (["lte", "eq", "gte"].includes(selection)) {
            setFilterVal((t) => {
                return { ...t, queryval: queryObj[selection], queryUnit: selection, typeDrop: false, queryDrop: false };
            });
        } else {
            setFilterVal((t) => {
                return { ...t, typeVal: typeObj[selection], typeDrop: false, queryDrop: false };
            });
        }
    };

    // state for input box val
    const [inputVal, setInputVal] = useState("");
    const updateInputVal = (val) => {
        setInputVal(val);
    };

    let rackData = useSelector((state) => state.bookdata.bookrack);
    let [bookFilter, setBookFilter] = useState({
        filter: false,
        reset: false,
    });

    const fetchResult = () => {
        setBookFilter((t) => {
            return { ...t, filter: true };
        });
    };

    useEffect(() => {
        if (bookFilter.filter) {
            if (filterVal.filterTypeVal != "Filter by" && filterVal.filterQueryVal != "Choose Query") {
                let options = {
                    method: "get",
                    params: {
                        unit: filterVal.queryUnit,
                        val: inputVal,
                        type: filterVal.typeVal.toLowerCase(),
                    },
                    url: "http://localhost:3001/filterBooks",
                };

                Axios.request(options).then((res) => {
                    dispatch(addbook([...res.data]));
                    setBookFilter((t) => {
                        return { ...t, filter: false };
                    });
                });
            }
        }
    }, [bookFilter]);

    const handleReset = () => {
        setBookFilter((t) => {
            return { ...t, reset: true };
        });
    };

    useEffect(() => {
        if (bookFilter.reset) {
            Axios.get("http://localhost:3001/getBooks").then((res) => {
                dispatch(addbook([...res.data]));
                setBookFilter((t) => {
                    return { ...t, reset: false };
                });
            });
        }
    }, [bookFilter]);

    return (
        <div className="filter-book">
            <div className="input-box">
                <div
                    className={
                        filterVal.typeDrop ? `dropdown-type drop-section show-drop` : `dropdown-type drop-section`
                    }
                >
                    <p className="filter-text" onClick={() => handleDropDown("typeDrop")}>
                        {filterVal.typeVal}
                    </p>
                    <div className="drop-content">
                        {Object.entries(typeObj).map((item, index) => {
                            return (
                                <p key={index} onClick={() => handleFilterVal(item[0])}>
                                    {item[1]}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div
                    className={
                        filterVal.queryDrop ? `dropdown-filter drop-section show-drop` : `dropdown-filter drop-section`
                    }
                >
                    <p className="filter-text" onClick={() => handleDropDown("queryDrop")}>
                        {filterVal.queryval}
                    </p>
                    <div className="drop-content">
                        {Object.entries(queryObj).map((item, index) => {
                            return (
                                <p key={index} onClick={() => handleFilterVal(item[0])}>
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
                    <button onClick={fetchResult}>Find</button>
                </div>
                <div className="find-query">
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}
