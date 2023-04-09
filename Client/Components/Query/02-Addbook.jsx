import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./01-QueryStyle.scss";
import Bookinfo from "./04-Bookinfo";

export default function Addbook() {
    let [showModel, setShowModel] = useState(false);

    return (
        <div className="add-book">
            <button onClick={() => setShowModel(true)}>Add Book</button>
            {showModel
                ? createPortal(
                      <Bookinfo showModel={showModel} setShowModel={setShowModel} />,
                      document.getElementById("root")
                  )
                : null}
        </div>
    );
}
