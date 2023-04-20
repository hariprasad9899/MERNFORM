import { configureStore } from "@reduxjs/toolkit";
import bookdataSlice from "../Components/Body/bookSlice";
import searchdataSlice from "../Components/Body/searchSlice";
import querySlice from "../Components/Query/querySlice";
import closeSlice from "../Components/Body/closeSlice";
const store = configureStore({
    reducer: {
        bookdata: bookdataSlice,
        searchdata: searchdataSlice,
        querydata: querySlice,
        searchdiv: closeSlice,
    },
});

export default store;
