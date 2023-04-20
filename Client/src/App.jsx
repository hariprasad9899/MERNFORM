import { useState } from "react";
import Query from "./Components/Query/01-Query";
import "./App.scss";
import Collections from "./Components/Body/01-Collections";
import SearchResult from "./Components/Body/03-SearchResult";

function App() {
    return (
        <div className="App">
            <Query />
            {/* <Collections /> */}
            <SearchResult />
        </div>
    );
}

export default App;
