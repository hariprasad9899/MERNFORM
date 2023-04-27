import { useState } from "react";
import Query from "./Components/Query/01-Query";
import "./App.scss";
import Collections from "./Components/Body/01-Collections";
import SearchResult from "./Components/Body/03-SearchResult";
import { useSelector, useDispatch } from "react-redux";
import Filters from "./Components/Query/05-Filters";

function App() {
    let closeBtn = useSelector((state) => state.searchdiv.closeBtn);

    return (
        <div className="App">
            <Query />
            {closeBtn ? <SearchResult /> : null}
            <Filters />
            <Collections />
        </div>
    );
}

export default App;
