import React from "react";

export default function Bookcard({ data }) {
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
            </div>
        </div>
    );
}
