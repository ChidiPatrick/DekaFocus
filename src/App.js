import React,{ Suspense } from 'react';
import logo from './logo.svg';
import './App.scss';
import FrontPage from './Components/FrontPage/FrontPage';
import { Routes, Route, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BreakUI from './Components/BreakUI/BreakUI';
import UserAccountUI from './Components/UserAccount/UserAccount';
import AddTask from './Components/addTask/addTask';
import Setting from './Components/Settings/Settings';
import Settings from './Components/Settings/Settings';
import AlarmTones from './Components/AlarmTones/AlarmTone';
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
		}
	})
	////////////////////////////////////////////////////
	const time = new Date();
	const minute = useSelector((state) => state.frontPage.minute5);
	time.setSeconds(time.getSeconds() + minute);
	const displayBreak = useSelector((state) => state.frontPage.break);
	console.log(displayBreak);
	let frontpage = null;
	if (displayBreak) {
		frontpage = <BreakUI expiryTimestamp={time} />;
	} else {
		frontpage = <FrontPage expiryTimestamp={time} />;
	}
	return (
		<Suspense fallback ={<p>Loading...</p>}>
		<div className="App">
			
			<Routes>
				<Route path="/" element={frontpage} />
				<Route path="/UserAccount" element={<UserAccountUI />} />
				<Route path="//todayTodo" element={<AddTask />} />
				<Route path="/tomorrowTodo" element={<AddTask />} />
				<Route path="/upcomingTodo" element={<AddTask />} />
				<Route path="/somedayTodo" element={<AddTask />} />
				<Route path="/events" element={<AddTask />} />
				<Route path="/completed" element={<AddTask />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/settings/workAlarm" element={<AlarmTones />} />
				<Route path="/signUpForm" element = {<SignUpForm/>} />
				<Route path= "/verifyEmail" element= {<VerifyEmail/>}/>
				<Route path="/signInForm" element={<SignInUser/>}/>
				<Route path="/AddProject" element={<AddProject/>}/>
			</Routes>
		</div>
		</Suspense>
	);
}

export default App;
