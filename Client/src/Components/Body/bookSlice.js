import { createSlice } from "@reduxjs/toolkit";
import data from "./sample";
const initialState = {
    bookrack: [...data],
};

const bookdataSlice = createSlice({
    name: "bookdata",
    initialState,
    reducers: {
        addbook: (state, action) => {
            state.bookrack = [...action.payload];
        },
    },
});

export default bookdataSlice.reducer;
export const { addbook } = bookdataSlice.actions;
