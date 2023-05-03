import React, { useEffect, useState } from "react";
import "./01-CollectionsStyle.scss";
import data from "./sample";
import Bookcard from "./02-Bookcard";
import Axios from "axios";
// import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { addbook } from "./bookSlice";

export default function Collections() {
    let pilot = data;

    // using Redux State
    let rackData = useSelector((state) => state.bookdata.bookrack);
    let newbookadded = useSelector((state) => state.bookdata.newbookadded);
    let dispatch = useDispatch();

    useEffect(() => {
        if (newbookadded) {
            Axios.get("https://librarydata.onrender.com/getBooks").then((res) => {
                dispatch(addbook([...res.data]));
            });
        }
    }, [newbookadded]);

    return (
        <div className="book-collection">
            <h2 className="head-name">Collections</h2>
            <div className="inner-div">
                {rackData.map((item) => (
                    <Bookcard data={item} key={item._id} />
                ))}
            </div>
        </div>
    );
}
