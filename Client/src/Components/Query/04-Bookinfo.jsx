import React, { useState } from "react";
import "./02-BookinfoStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { addbook, updatebook } from "../Body/bookSlice";
import Axios from "axios";

export default function Bookinfo({ setShowModel }) {
    let pilot = {
        bookname: "",
        author: "",
        year: "",
        rent: "",
        buy: "",
        imgaddress: "",
    };
    let [bookInfo, setBookInfo] = useState(pilot);
    let rackData = useSelector((state) => state.bookdata.bookrack);
    let dispatch = useDispatch();

    function validate(obj) {
        for (let i in obj) {
            if (obj[i].length < 1) {
                return false;
            }
        }
        return true;
    }

    const updateInfo = (type, value) => {
        setBookInfo((t) => {
            return { ...t, [type]: value };
        });
    };

    const addBooktoServer = () => {
        Axios.post("http://localhost:3001/addBook", { ...bookInfo }).then((res) => {
            dispatch(updatebook());
            alert("Book added");
            setShowModel(false);
        });
    };

    const submitBook = () => {
        if (!validate(bookInfo)) {
            alert("Please fill all the information!");
        } else {
            addBooktoServer();
        }
    };

    return (
        <div className="book-info">
            <div className="inner-container">
                <div className="close-btn" onClick={() => setShowModel(false)}>
                    &times;
                </div>

                <div className="input-form">
                    <div className="book-details">
                        <label htmlFor="bookname">Book Name </label>
                        <input
                            type="text"
                            htmlFor="bookname"
                            value={bookInfo.bookname}
                            onChange={(e) => updateInfo("bookname", e.target.value)}
                        />
                    </div>

                    <div className="book-details">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            htmlFor="author"
                            value={bookInfo.author}
                            onChange={(e) => updateInfo("author", e.target.value)}
                        />
                    </div>

                    <div className="book-details">
                        <label htmlFor="Year">Year</label>
                        <input
                            type="text"
                            htmlFor="Year"
                            value={bookInfo.year}
                            onChange={(e) => updateInfo("year", e.target.value)}
                        />
                    </div>

                    <div className="book-details">
                        <label htmlFor="rent">Rent </label>
                        <input
                            type="text"
                            htmlFor="rent"
                            value={bookInfo.rent}
                            onChange={(e) => updateInfo("rent", e.target.value)}
                        />
                    </div>

                    <div className="book-details">
                        <label htmlFor="buy">Buy</label>
                        <input
                            type="text"
                            htmlFor="buy"
                            value={bookInfo.buy}
                            onChange={(e) => updateInfo("buy", e.target.value)}
                        />
                    </div>

                    <div className="book-details">
                        <label htmlFor="imgsrc">Img Src </label>
                        <input
                            type="text"
                            htmlFor="imgsrc"
                            value={bookInfo.imgaddress}
                            onChange={(e) => updateInfo("imgaddress", e.target.value)}
                        />
                    </div>
                </div>

                <div className="complete">
                    <button onClick={() => submitBook(bookInfo)}>Submit</button>
                    <button onClick={() => setShowModel(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
