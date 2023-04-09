import React from "react";
import "./02-BookinfoStyle.scss";

export default function Bookinfo({ setShowModel }) {
    return (
        <div className="book-info">
            <div className="inner-container">
                <div className="close-btn" onClick={() => setShowModel(false)}>
                    &times;
                </div>

                <div className="input-form">
                    <div className="book-details">
                        <label for="bookname">Book Name </label>
                        <input type="text" for="bookname" />
                    </div>

                    <div className="book-details">
                        <label for="author">Author</label>
                        <input type="text" for="author" />
                    </div>

                    <div className="book-details">
                        <label for="Year">Year</label>
                        <input type="text" for="Year" />
                    </div>

                    <div className="book-details">
                        <label for="rent">Rent </label>
                        <input type="text" for="rent" />
                    </div>

                    <div className="book-details">
                        <label for="buy">Buy</label>
                        <input type="text" for="buy" />
                    </div>

                    <div className="book-details">
                        <label for="imgsrc">Img Src </label>
                        <input type="text" for="imgsrc" />
                    </div>
                </div>

                <div className="complete">
                    <button>Submit</button>
                    <button onClick={() => setShowModel(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
