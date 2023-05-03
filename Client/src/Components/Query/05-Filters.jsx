import React, { useEffect } from "react";
import "./05-FiltersStyle.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { addbook } from "../Body/bookSlice";

export default function Filters() {
    let dispatch = useDispatch();

    // // drop state for Filter By
    // const [dropTypeFilter, setDropTypeFilter] = useState(false);
    // // drop state for Query By
    // const [dropQueryFilter, setDropQueryFilter] = useState(false);

    // const [dropFilter, setDropFilter] = useState({
    //     query: false,
    //     type: false,
    // });

    // // state for filter type val
    // const [filterTypeVal, setFilterTypeVal] = useState("Filter by");

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

    // state for filter query val
    const [filterQueryVal, setFilterQueryVal] = useState("Choose Query");

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
        if (["lte", "e", "gte"].includes(selection)) {
            setFilterVal((t) => {
                return { ...t, queryval: queryObj[selection], queryUnit: selection };
            });
        } else {
            setFilterVal((t) => {
                return { ...t, typeVal: typeObj[selection] };
            });
        }
    };

    // state for input box val
    const [inputVal, setInputVal] = useState("");

    // // state for data val
    // const [dataTypeVal, setDataTypeVal] = useState("");
    // const [dataQueryVal, setDataQueryVal] = useState("");

    // const updateTypeClickVal = () => {
    //     setDropTypeFilter(!dropTypeFilter);
    //     setDropQueryFilter(false);
    // };

    // const updateQueryClickVal = () => {
    //     setDropQueryFilter(!dropQueryFilter);
    //     setDropTypeFilter(false);
    // };

    // const updateQueryVal = (type) => {
    //     setFilterQueryVal(queryObj[type]);
    //     setDropQueryFilter(false);
    //     setDataQueryVal(type);
    //     setInputVal("");
    // };

    // const updateTypeVal = (type) => {
    //     setFilterTypeVal(typeObj[type]);
    //     setDropTypeFilter(false);
    //     setDataTypeVal(type);
    //     setInputVal("");
    // };

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
                        unit: filterVal.queryUnit,
                        val: inputVal,
                        type: filterVal.typeVal.toLowerCase(),
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
                    <button onClick={() => fetchResult()}>Find</button>
                </div>
                <div className="find-query">
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}
