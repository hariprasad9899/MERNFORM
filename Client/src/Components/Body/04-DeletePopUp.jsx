import React from "react";
import "./04-DeletePopUpStyle.scss";

export default function DeletePopUp({ deletePop, setDeletePop, deleteBook, setDeleteBook }) {
    const confirmationYes = () => {
        setDeletePop(false);
        setDeleteBook(true);
    };

    const confirmationNo = () => {
        setDeletePop(false);
    };

    return (
        <div className="delete-popup">
            <div className="conf-text">
                <h2>Are you sure, you want to delete this Book ? </h2>
            </div>
            <div className="conf-btn">
                <button onClick={() => confirmationYes()}>Yes</button>
                <button onClick={() => confirmationNo()}>No</button>
            </div>
        </div>
    );
}
