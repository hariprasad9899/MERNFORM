import { configureStore } from "@reduxjs/toolkit";
import bookdataSlice from "../Components/Body/bookSlice";

const store = configureStore({
    reducer: {
        bookdata: bookdataSlice,
    },
});

export default store;
