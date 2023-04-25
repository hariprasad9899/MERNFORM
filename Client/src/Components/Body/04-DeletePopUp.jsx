import React from "react";
import "./04-DeletePopUpStyle.scss";

export default function DeletePopUp({ showPop, setShowPop, deleteBook, setDeleteBook }) {
    const confirmationYes = () => {
        setShowPop(false);
        setDeleteBook(true);
    };

    const confirmationNo = () => {
        setShowPop(false);
    };

    return (
        <div className="delete-popup">
            <h2>Are you sure, you want to delete this Book ? </h2>
            <button onClick={() => confirmationYes()}>Yes</button>
            <button onClick={() => confirmationNo()}>No</button>
        </div>
    );
}
