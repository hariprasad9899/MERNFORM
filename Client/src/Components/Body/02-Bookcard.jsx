import React, { useEffect, useState } from "react";
import Axios from "axios";
import { updatebook } from "./bookSlice";
import { useDispatch } from "react-redux";
export default function Bookcard({ data }) {
    let dispatch = useDispatch();

    const deleteBook = (deleteId) => {
        let options = {
            method: "delete",
            params: {
                id: deleteId,
            },
            url: `http://localhost:3001/deleteBook/`,
        };

        Axios.request(options).then((res) => {
            dispatch(updatebook());
        });
    };

    return (
        <div className="book-card">
            <div className="img-section">
                <img alt="no-img-found" src={data.imgaddress} />
            </div>
            <div className="info-section">
                <p>Book Name: {data.bookname}</p>
                <p>Author: {data.author}</p>
                <p>Year: {data.year}</p>
                <p>Rent: {data.rent}</p>
                <p>Buy: {data.buy}</p>
                <button className="edit-btn modify">Edit</button>
                <button className="delete-btn modify" onClick={() => deleteBook(data._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}
