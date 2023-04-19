import { configureStore } from "@reduxjs/toolkit";
import bookdataSlice from "../Components/Body/bookSlice";
import searchdataSlice from "../Components/Body/searchSlice";
import querySlice from "../Components/Query/querySlice";

const store = configureStore({
    reducer: {
        bookdata: bookdataSlice,
        searchdata: searchdataSlice,
        querydata: querySlice,
    },
});

export default store;
