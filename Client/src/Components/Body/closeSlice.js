import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    closeBtn: false,
};

const searchdivSlice = createSlice({
    name: "searchdiv",
    initialState,
    reducers: {
        close: (state, action) => {
            state.closeBtn = false;
        },
        open: (state, action) => {
            state.closeBtn = true;
        },
    },
});

export default searchdivSlice.reducer;
export const { close, open } = searchdivSlice.actions;
