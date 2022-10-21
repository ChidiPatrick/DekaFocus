import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    stopWatchIcon: false,
}
const PomodoroSettingSlice = createSlice({
    name: "PomodoroStetting",
    initialState,
    reducers: {
        blurStopWatchIcon(state,action){
            state.stopWatchIcon = false
        },
        showStopWatchIcon (state,action){
            state.stopWatchIcon = true
        }
    }

})
export const {blurStopWatchIcon,showStopWatchIcon} = PomodoroSettingSlice.actions;
export default PomodoroSettingSlice.reducer