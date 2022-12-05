import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {doc,getDoc} from "firebase/firestore"
const initialState = {
	pomodoroLengthSelected: false,
	shortBreakLengthSelected: false,
	longBreakLengthSelected: false,
	longBreakAfterSelected: false,
	pomodoroCurrLength: 45,
	shortBreakCurrLength: 10,
	longBreakCurrLength: 15,
	longBreakAfterCurrLength: 4,
	goForBreak: false,
	autoStartNextPomodoro: false,
	autoStartBreak: true,
	userSettings: null
};
export const fetchUserSettings = createAsyncThunk("settings/fetchUserSettings", async (daa,{dispatch,getState}) =>{
	try{
	// 	const userSettings = getState()
	// 	// const response = await getDoc()
	// 	console.log(userSettings);
	}
	catch(err) {
		console.log(err);
	}
})
const SettingSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		showMinutes(state, action) {
			state.pomodoroLengthSelected = true;
		},
		hideMinutes(state, action) {
			state.pomodoroLengthSelected = false;
		},
		showShortBreak(state, action) {
			state.shortBreakLengthSelected = true;
		},
		hideShortBreak(state, action) {
			state.shortBreakLengthSelected = false;
		},
		showLongBreakAfter(state, action) {
			state.longBreakAfterSelected = true;
		},
		hideLongBreakAfter(state, action) {
			state.longBreakAfterSelected = false;
		},
		showLongBreak(state, action) {
			state.longBreakLengthSelected = true;
		},
		hideLongBreak(state, action) {
			state.longBreakLengthSelected = false;
		},
		updatePomodoroTime(state, action) {
			const { currTime } = action.payload;
			state.pomodoroCurrLength = currTime;
		},
		updateShortBreakTime(state, action) {
			const { currTime } = action.payload;
			state.shortBreakCurrLength = currTime;
		},
		updateLongBreakTime(state, action) {
			const { currTime } = action.payload;
			state.longBreakCurrLength = currTime;
		},
		updateLongBreakAfterTime(state, action) {
			const { currTime } = action.payload;
			state.longBreakAfterCurrLength = currTime;
		},
		enableAutoStartBreak(state, action) {
			state.autoStartBreak = true;
		},
		disableAutoStartBreak(state, action) {
			state.autoStartBreak = false;
		},
		enableAutoStartPomodoro(state, action) {
			state.autoStartNextPomodoro = true;
		},
		disableAutoStartPomodoro(state, action) {
			state.autoStartNextPomodoro = false;
		},
		enableGoForBreak(state, action) {
			state.goForBreak = true;
		},
		disableGoForBreak(state, action) {
			state.goForBreak = false;
		},
		getUserSettings(state,action) {
			state.userSettings = action.payload
			console.log(state.userSettings);
		}
	}
});
export const {
	showMinutes,
	hideMinutes,
	updateTime,
	showLongBreak,
	hideLongBreak,
	showLongBreakAfter,
	hideLongBreakAfter,
	showShortBreak,
	hideShortBreak,
	updateLongBreakAfterTime,
	updateLongBreakTime,
	updatePomodoroTime,
	updateShortBreakTime,
	disableAutoStartBreak,
	enableAutoStartBreak,
	enableAutoStartPomodoro,
	disableAutoStartPomodoro,
	disableGoForBreak,
	enableGoForBreak,
	getUserSettings,
	
	
} = SettingSlice.actions;
export default SettingSlice.reducer;
