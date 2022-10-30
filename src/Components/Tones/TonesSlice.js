import React from "react";
import {creacteSlice, createSlice} from "@reduxjs/toolkit"
// import 
const initialState = {
    selectedTone: "Bell",
};
const TonesSlice = createSlice({
    name: "Tones",
    initialState,
    reducers: {
        getSelectedTone(state,action){
            let tone = action.payload
            console.log(typeof tone)
            state.selectedTone = tone

        } 
    }
})
export const {getSelectedTone} = TonesSlice.actions;
export default TonesSlice.reducer