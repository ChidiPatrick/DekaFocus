import React,{ Suspense } from 'react';
import './App.scss';
import FrontPage from './Components/FrontPage/FrontPage';
import { Routes, Route, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BreakUI from './Components/BreakUI/BreakUI';
import UserAccountUI from './Components/UserAccount/UserAccount';
import AddTask from './Components/addTask/addTask';
import Setting from './Components/Settings/Settings';
import Settings from './Components/Settings/Settings';
import WorkAlarmTones from './Components/AlarmTones/workAlarm';
import BreakAlarmTones from './Components/AlarmTones/breakAlarm';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, DocumentSnapshot, getDoc, getDocs, getFirestore, setDoc, updateDoc, query } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { createUserCollection, firebaseConfig } from './Components/Firebase/Firebase';
import SignUpForm from './Components/SignUpForms/SignUpForm';
import SignInUser from "./Components/SignUpForms/SignInUser"
import AddProject from './Components/AddProject/AddProject';
import VerifyEmail from './Components/VerificationPage/VerificationPage';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./Components/Firebase/Firebase"
import {getUserId} from "./Components/SignUpForms/SignUpFormSlice"
import Projects from './Components/Projects/Projects';
import {fetchUserSettings} from "./Components/Settings/SettingsSlice"

// const analytics = getAnalytics(app);

//////////////////////////////////////
function App() {
	// const [user,loading,erro] = useAuthState(auth)
	const dispatch = useDispatch()
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	let folder = null;
	
	createUserCollection('Patrick okafor');
	const verified = useSelector(state => state.signUpSlice.verified)
	// console.log(user);
	// dispatch(getUserId(user.uid))
	onAuthStateChanged(auth, (user) => {
		if(user) {
			dispatch(getUserId(user.uid))
			console.log(user.uid);
			dispatch(fetchUserSettings(user.uid))
		}
	})
	////////////////////////////////////////////////////
	const minute = useSelector((state) => state.settings.pomodoroCurrLength);
	const shortBreakLength = useSelector(state => state.settings.shortBreakCurrLength)
	console.log(minute);
	const timeMinutes = new Date();
	const timeSeconds = new Date()
	
	
	///Implement time conversion here /////
	timeMinutes.setSeconds(timeMinutes.getSeconds() +  60 * minute);
	timeSeconds.setSeconds(timeSeconds.getSeconds() + (60 * shortBreakLength))
	const displayBreak = useSelector((state) => state.frontPage.break);
	console.log(timeMinutes);
	let frontpage = null;
	if (displayBreak) {
		frontpage = <BreakUI expiryTimestamp={timeSeconds} />;
	} else {
		frontpage = <FrontPage expiryTimestamp={timeMinutes} />;
	}
	return (
		
		<div className="App">
			<Routes>
				<Route path="/" element={frontpage} />
				<Route path="/UserAccount" element={<UserAccountUI />} />
				<Route path="/todayTodo" element={<AddTask />} />
				<Route path="/tomorrowTodo" element={<AddTask />} />
				<Route path="/upcomingTodo" element={<AddTask />} />
				<Route path="/somedayTodo" element={<AddTask />} />
				<Route path="/events" element={<AddTask />} />
				<Route path="/completed" element={<AddTask />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/settings/workAlarm" element={<WorkAlarmTones />} />
				<Route path="/settings/breakAlarm" element={<BreakAlarmTones />} />
				<Route path="/signUpForm" element = {<SignUpForm/>} />
				<Route path= "/verifyEmail" element= {<VerifyEmail/>}/>
				<Route path="/signInForm" element={<SignInUser/>}/>
				<Route path="/AddProject" element={<AddProject/>}/>
				<Route path="/Projects" element={<Projects/>}/>
			</Routes>
		</div>
		
	);
}

export default App;
