import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    selected: false,
    pomodoroLength: 45,
}

const SettingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        showMinutes(state, action){
            state.selected = true
        },
        hideMinutes(state, action){
            state.selected = false
        }
    }
})
export const {showMinutes,hideMinutes} = SettingSlice.actions;
export default SettingSlice.reducer