import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {doc,getDoc} from "firebase/firestore"
import { db } from '../Firebase/Firebase';
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
	userSettings: null,
	projects: null
};
export const fetchUserSettings = createAsyncThunk("settings/fetchUserSettings", async (userId,{dispatch,getState}) =>{
	try{
		const settingsRef = doc(db,"users",`${userId}`)
		const data = await getDoc(settingsRef)
    	if(data.exists()){
        console.log(data.data());
		dispatch(getUserProjects(data.data().projects))
         return data
   	 }
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
			state.pomodoroCurrLength = action.payload
		},
		updateShortBreakTime(state, action) {
			
			state.shortBreakCurrLength = action.payload;
		},
		updateLongBreakTime(state, action) {
			
			state.longBreakCurrLength = action.payload;
		},
		updateLongBreakAfterTime(state, action) {
			
			state.longBreakAfterCurrLength = action.payload;
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
		},
		getUserProjects(state,action) {
			state.projects = action.payload
			console.log(action.payload);
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
	getUserProjects
	
	
} = SettingSlice.actions;
export default SettingSlice.reducer;
