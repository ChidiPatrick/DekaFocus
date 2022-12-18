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
	workAlarm: "Bell2",
	userSettings: null,
	projects: null,
	tasks: null,
	taskProjectTitle: null,
	projectTasks: []
};
export const fetchUserSettings = createAsyncThunk("settings/fetchUserSettings", async (userId,{dispatch,getState}) =>{
	try{
		const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
		const data = await getDoc(settingsRef)
    	if(data.exists()){
        console.log(data.data());
		dispatch(getUserProjects(data.data().projects))
		console.log(data.data().projects);
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
		},
		getProjectTasks(state,action) {
			state.tasks = action.payload
		},
		getProjectTitle(state,action) {
			state.taskProjectTitle = action.payload
		},
		getProjectCurrTasks(state,action){
			state.projectTasks.push(action.payload)
			// console.log(state.projectTasks);
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
	getUserProjects,
	getProjectTasks,
	getProjectTitle,
	getProjectCurrTasks
} = SettingSlice.actions;
export default SettingSlice.reducer;
