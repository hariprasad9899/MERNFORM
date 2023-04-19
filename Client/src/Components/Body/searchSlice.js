import { createSlice } from "@reduxjs/toolkit";
import data from "./sample";
const initialState = {
    searchrack: [...data],
};

const searchdataSlice = createSlice({
    name: "searchdata",
    initialState,
    reducers: {
        searchbook: (state, action) => {
            state.searchrack = [...action.payload];
        },
        clearsearch: (state, action) => {
            state.searchrack = [];
        },
    },
});

export default searchdataSlice.reducer;
export const { searchbook, clearsearch } = searchdataSlice.actions;
