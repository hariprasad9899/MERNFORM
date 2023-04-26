import React from "react";
import "./04-UpdatePopStyle.scss";

export default function UpdatePop({ bookInfo, setBookInfo, setUpdatePop, setUpdateBookData }) {
    const updateInfo = (type, value) => {
        setBookInfo((t) => {
            return { ...t, [type]: value };
        });
    };

    return (
        <div className="update-popup">
            <div className="inner-container">
                <div className="close-btn" onClick={() => setUpdatePop(false)}>
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
                    <button onClick={() => setUpdateBookData(true)}>Submit</button>
                    <button onClick={() => setUpdatePop(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
