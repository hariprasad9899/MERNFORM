import { configureStore } from "@reduxjs/toolkit";
import bookdataSlice from "../Components/Body/bookSlice";
import searchdataSlice from "../Components/Body/searchSlice";

const store = configureStore({
    reducer: {
        bookdata: bookdataSlice,
        searchdata: searchdataSlice,
    },
});

export default store;
