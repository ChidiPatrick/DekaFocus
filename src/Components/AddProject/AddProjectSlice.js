import React from "react";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const postProject = createAsyncThunk("addProject/postProject", async () => {
    // await 
})
const initialState = {
    projects : [],
    showProjectBtn: false,
}
const AddProjectSlice = createSlice({
    name: "AddProject",
    initialState,
    reducers:  {
        addProject: (state,action) => {
            state.projects.push(action.payload)
        },
        activateProjectBtn: (state,action) => {
            state.showProjectBtn = true
        },
        deActivateProjectBtn: (state,action) => {
            state.showProjectBtn = false
        },
        createProject: (state, action) => {
            state.projects.push(action.payload)
        }
    }
})
export const {
    addProject,
    activateProjectBtn,
    deActivateProjectBtn,
    createProject

} = AddProjectSlice.actions
export default AddProjectSlice.reducer