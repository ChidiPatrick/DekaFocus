import React from "react";
import {creacteSlice, createSlice} from "@reduxjs/toolkit"
// import 
const initialState = {
    workAlarm: "Bell2",
    breakAlarm: "Impact"
};
const TonesSlice = createSlice({
    name: "Tones",
    initialState,
    reducers: {
        getSelectedTone(state,action){
            state.selectedTone = action.payload
            console.log( action.payload);
        } 
    }
})
export const {getSelectedTone} = TonesSlice.actions;
export default TonesSlice.reducer