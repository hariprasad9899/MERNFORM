import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

const updatePopState = createSlice({
    name: "updatePopState",
    initialState,
    reducers: {
        close: (state, action) => {
            state.isOpen = false;
        },
        open: (state, action) => {
            state.isOpen = true;
        },
    },
});

export default updatePopState.reducer;
export const { close, open } = updatePopState.actions;
