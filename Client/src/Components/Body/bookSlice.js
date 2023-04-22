import { createSlice } from "@reduxjs/toolkit";
import data from "./sample";
const initialState = {
    bookrack: [...data],
    newbookadded: true,
};

const bookdataSlice = createSlice({
    name: "bookdata",
    initialState,
    reducers: {
        addbook: (state, action) => {
            state.bookrack = [...action.payload];
            state.newbookadded = false;
        },
        updatebook: (state, action) => {
            state.newbookadded = true;
        },
    },
});

export default bookdataSlice.reducer;
export const { addbook, updatebook } = bookdataSlice.actions;
