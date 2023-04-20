import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchquery: {
        type: "",
        value: "",
        startsearch: false,
    },
};

const querydataSlice = createSlice({
    name: "querydata",
    initialState,
    reducers: {
        searchbooktype: (state, action) => {
            state.searchquery = { ...action.payload };
        },
    },
});

export default querydataSlice.reducer;
export const { searchbooktype } = querydataSlice.actions;
