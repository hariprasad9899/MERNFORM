import { useState } from "react";
import Query from "../Components/Query/01-Query";
import "./App.scss";
import Collections from "../Components/Body/01-Collections";

function App() {
    return (
        <div className="App">
            <Query />
            <Collections />
        </div>
    );
}

export default App;
