import React, { useEffect, useState } from "react";
import Axios from "axios";
import { updatebook } from "./bookSlice";
import { useDispatch } from "react-redux";
import DeletePopUp from "./04-DeletePopUp";
import { createPortal } from "react-dom";
export default function Bookcard({ data }) {
    let dispatch = useDispatch();

    let [showPop, setShowPop] = useState(false);
    let [deleteBook, setDeleteBook] = useState(false);
    let [deleteId, setDeleteId] = useState("");

    const deleteRecord = (options) => {};

    const deleteBookfromDB = (id) => {
        setShowPop(true);
        setDeleteId(id);
    };

    if (deleteBook) {
        let options = {
            method: "delete",
            params: {
                id: deleteId,
            },
            url: `http://localhost:3001/deleteBook/`,
        };

        Axios.request(options).then((res) => {
            dispatch(updatebook());
            setDeleteBook(false);
        });
    }

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
                <button className="delete-btn modify" onClick={() => deleteBookfromDB(data._id)}>
                    Delete
                </button>
                {showPop
                    ? createPortal(
                          <DeletePopUp
                              showPop={showPop}
                              setShowPop={setShowPop}
                              deleteBook={deleteBook}
                              setDeleteBook={setDeleteBook}
                          />,
                          document.getElementById("root")
                      )
                    : null}
            </div>
        </div>
    );
}
