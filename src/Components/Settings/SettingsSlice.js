import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {doc,getDoc} from "firebase/firestore"
import { act } from 'react-dom/test-utils';
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
	projects: [],
	currTasks: null,
	userTasks: null,
	/// Projects parent tasks object
	tasks: null,
	////////
	taskHeader: null,
	///Container for clicked project tasks to perform
	projectTasks: [],
	projectId: 0,
	currTasksArray: null,
	clickedProjectIdentitfier: null,
	tasksToBeCompleted: 0,
	completedTasks: 0,
	elapsedTime: 0,
	estimatedTime: 0,
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
export const FetchTasks = createAsyncThunk("settings/fetchProjectTasks",async (userId,{dispatch,getState}) =>{
	try{
		const tasksRef = doc(db,"users",`${userId}`,"userTasksCollection","tasks")
		const data = await getDoc(tasksRef)
    	if(data.exists()){
		const projectsTasks = data.data().projectsTasks
		console.log(projectsTasks);
		// const tasks = projectsTasks
		dispatch(setUserTasks(projectsTasks))
		dispatch(setTaskDataAvailable())
         return projectsTasks
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
			
		},
		getUserProjects(state,action) {
			state.projects = action.payload
		},
		getProjectTasks(state,action) {
			state.tasks = action.payload
		},
		updateCurrProjectTasks(state,action){
			state.tasks.push(action.payload)
		},
		getProjectTitle(state,action) {
			state.taskHeader = action.payload
		},
		getProjectTodos(state,action){
			// const newTask = []
			// newTask.push(action.payload)
			// state.projectTasks = [...state.projectTasks,...newTask] 
			state.projectTasks.push(action.payload)
			// console.log(state.projectTasks);
		},
		setProjectId(state,action){
			state.projectId = action.payload
		},
		setCurrTasks(state,action){
			state.currTasks = action.payload

		},
		
		setUserTasks(state,action){
			state.userTasks = action.payload
		},
		setClickedProjectId(state,action) {
			state.clickedProjectIdentitfier = action.payload
		},
		setTaskDataAvailable(state,action){
			state.taskDataAvailable = true
		},
		setTasksToBeCompleted(state,action){
			state.tasksToBeCompleted = action.payload
		},
		updateTasksToBeCompleted(state, action){
			state.tasksToBeCompleted = state.tasksToBeCompleted + 1
		},
		setTimeElasped(state,action){
			state.elapsedTime = action.payload
		},
		setCompletedTasks(state,action){
			state.completedTasks = action.payload
		},
		setEstimatedTime(state,action){
			state.estimatedTime = action.payload
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
	getProjectTodos,
	setProjectId,
	setCurrTasks,
	setUserTasks,
	setClickedProjectId,
	setTaskDataAvailable,
	updateCurrProjectTasks,
	setCompletedTasks,
	setEstimatedTime,
	setTasksToBeCompleted,
	setTimeElasped,
	updateTasksToBeCompleted
} = SettingSlice.actions;
export default SettingSlice.reducer;
