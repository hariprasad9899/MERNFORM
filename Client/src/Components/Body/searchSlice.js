import { createSlice } from "@reduxjs/toolkit";
import data from "./sample";
import { useDispatch } from "react-redux";
import { resetsearch } from "../Query/querySlice";
const initialState = {
    searchrack: [],
};

const searchdataSlice = createSlice({
    name: "searchdata",
    initialState,
    reducers: {
        searchbook: (state, action) => {
            state.searchrack = action.payload;
        },
        clearsearch: (state, action) => {
            state.searchrack.splice(0, state.searchrack.length);
        },
    },
});

export default searchdataSlice.reducer;
export const { searchbook, clearsearch } = searchdataSlice.actions;
