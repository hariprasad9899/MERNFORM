import React from "react";
import "./01-CollectionsStyle.scss";
import data from "./sample";
import Bookcard from "./02-Bookcard";

export default function Collections() {
    return (
        <div className="book-collection">
            <h2 className="head-name">Collections</h2>
            <div className="inner-div">
                {data.map((item) => (
                    <Bookcard data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}
