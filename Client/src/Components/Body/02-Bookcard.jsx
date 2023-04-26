import React, { useEffect, useState } from "react";
import Axios from "axios";
import { updatebook } from "./bookSlice";
import { useDispatch } from "react-redux";
import DeletePopUp from "./04-DeletePopUp";
import { createPortal } from "react-dom";
import UpdatePop from "./04-UpdatePop";
import { useSelector } from "react-redux";
import { close, open } from "./updatePopSlice";
export default function Bookcard({ data }) {
    let dispatch = useDispatch();

    let [deletePop, setDeletePop] = useState(false);
    let [deleteBook, setDeleteBook] = useState(false);
    let [deleteId, setDeleteId] = useState("");

    const deleteBookfromDB = (id) => {
        setDeletePop(true);
        setDeleteId(id);
    };

    // Method 1: Passing id using body
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

    // // Method 2: Passing id using link
    // if (deleteBook) {
    //     let options = {
    //         method: "delete",
    //         params: {
    //             id: deleteId,
    //         },
    //         url: `http://localhost:3001/deleteBook/${deleteId}`,
    //     };

    //     Axios.request(options).then((res) => {
    //         dispatch(updatebook());
    //         setDeleteBook(false);
    //     });
    // }

    const [updateBookData, setUpdateBookData] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [updatePop, setUpdatePop] = useState(false);
    const updatePopState = useSelector((state) => state.updatePopState.isOpen);
    let pilot = {
        bookname: data["bookname"],
        author: data["author"],
        year: data["year"],
        rent: data["rent"],
        buy: data["buy"],
        imgaddress: data["imgaddress"],
    };
    let [bookInfo, setBookInfo] = useState(pilot);

    const updatebookfromDB = (data) => {
        if (!updatePopState) {
            setUpdatePop(true);
            setUpdateId(data["_id"]);
            dispatch(open());
        }
    };

    if (updateBookData) {
        let options = {
            method: "put",
            params: {
                ...bookInfo,
            },
            url: `http://localhost:3001/updateBook/${updateId}`,
        };

        Axios.request(options).then((res) => {
            setUpdateBookData(false);
            dispatch(updatebook());
            dispatch(close());
            setUpdatePop(false);
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
                <button className="edit-btn modify" onClick={() => updatebookfromDB(data)}>
                    Edit
                </button>

                {updatePop
                    ? createPortal(
                          <UpdatePop
                              setBookInfo={setBookInfo}
                              bookInfo={bookInfo}
                              setUpdatePop={setUpdatePop}
                              setUpdateBookData={setUpdateBookData}
                          />,
                          document.getElementById("root")
                      )
                    : null}

                <button className="delete-btn modify" onClick={() => deleteBookfromDB(data._id)}>
                    Delete
                </button>
                {deletePop
                    ? createPortal(
                          <DeletePopUp
                              deletePop={deletePop}
                              setDeletePop={setDeletePop}
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
