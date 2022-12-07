import React, { useState, useRef,useEffect,Suspense } from 'react';
import styles from './Settings.module.scss';
import { Link } from 'react-router-dom';
import NavButton from '../NavButtons/NavButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {useCollection, useDocument, useDocumentData, useDocumentOnce} from "react-firebase-hooks/firestore"
import { db,auth,app } from '../Firebase/Firebase';
import {doc,collection,getDoc,updateDoc} from "firebase/firestore"
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Spinner from '../Spinner/Spinner';
import {
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
	getUserSettings
} from '../Settings/SettingsSlice';
import { fetchUserSettings } from '../Settings/SettingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import Switch from '@mui/material/Switch';
// import { Switch } from 'evergreen-ui';
import { ClipLoader } from 'react-spinners/ClipLoader';
import { createResource } from '../PersonApi/PersonApi';
import Person from '../PersonApi/PersonComponent';
import SettingsComponent from './settingsComponent';

const Settings = (props) => {
	
onAuthStateChanged(auth, (user) => {
	console.log(user.id);
})
	///////////////////
	//HOOKS//
	const [ checked, setChecked ] = useState(false);
	///GLOBALS/////////
	const dispatch = useDispatch();
	////Select Display states/////
	const selected = useSelector((state) => state.settings.selected);
	const pomodoroLengthSelected = useSelector((state) => state.settings.pomodoroLengthSelected);
	const shortBreakLengthSelected = useSelector((state) => state.settings.shortBreakLengthSelected);
	const longBreakLengthSelected = useSelector((state) => state.settings.longBreakLengthSelected);
	const longBreakAfterLengthSelected = useSelector((state) => state.settings.longBreakAfterSelected);
	const autoStartBreak = useSelector((state) => state.settings.autoStartBreak);
	const autoStartNextPomodoro = useSelector((state) => state.settings.autoStartNextPomodoro);
	const goForBreak = useSelector((state) => state.settings.goForBreak);
	const userSettings = useSelector((state) => state.settings.userSettings)
	/// Get Pomodoro Durations //////
	const pomodoroCurrLength = useSelector((state) => state.settings.pomodoroCurrLength);
	const shortBreakCurrLength = useSelector((state) => state.settings.shortBreakCurrLength);
	const longBreakCurrLength = useSelector((state) => state.settings.longBreakCurrLength);
	const longBreakAfterCurrLength = useSelector((state) => state.settings.longBreakAfterCurrLength);
	const userId = useSelector((state) => state.signUpSlice.userId)
	//////////////////////////////////////
	// const [user, loading, error ] = useAuthState(auth)
	let userData = []
	console.log(userId);
	// const usersId = localStorage.getItem("userId")
	console.log(userSettings);
		/////Get data function
		
		///////Settings handlers ////////////////
		const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
		// const updatePomodoroLength = async (e) =>  {
		// 	await updateDoc(settingsRef, {
		// 		pomodoroLength: e.target.value
		// 	});
		// 	reload()
		// }
		// const updateShortBreak = async (e) => {
		// 	await updateDoc(selectRef, {
		// 		shortBreakLength: e.value.target
		// 	})
		// 	reload()
		// }
		// const updateLongBreakLength = async (e) => {
		// 	await updateDoc(selectRef, {
		// 		longBreakAfter: e.target.value
		// 	})
		// 	reload()
		// }
		// const updateLongBreakAfter = async (e) => {
		// 	await updateDoc(selectRef, {
		// 		longBreakAfter: e.target.value
		// 	})
		// 	reload()
		// }
		// const updateAutoStartBreak = async (e) => {
		// 	await updateDoc(settingsRef, {
		// 		autoStartBreaks: e.target.value
		// 	});
		// 	reload()
		// }
		// const updateDisableBreak = async (values) => {
		// 	await updateDoc(settingsRef, {
		// 		disableBreak: value.data().autoStartNextPomodoro
		// 	});
		// 	reload()
		// }
		// const updateAlarmBreak = async (e) => {
		// 	await updateDoc(settingsRef, {
		// 		breakAlarm: e.target.value
		// 	});
		// 	reload()
		// }
		// const updateShortBreakLength = async (e) => {
		// 	await updateDoc(settingsRef, {
		// 		shortBreakLength: e.target.value
		// 	});
		// 	reload()
		// }
	
	////////////////////////////////////
	const selectRef = useRef();
	const Minutes = [];
	let selectedTime = 45;
	for (let i = 0; i <= 60; i++) {
		Minutes.push(i + 1);
	}
	

	///////////////////////////////////
	//GET SELECTED MINUTE
	const getPomodoroTime = (e) => {
		let curValue = e.target.value;
		console.log(typeof selectedTime);
		dispatch(hideMinutes());
		dispatch(updatePomodoroTime({ currTime: curValue }));
	};
	const getShortBreakTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideShortBreak());
		dispatch(updateShortBreakTime({ currTime: curValue }));
	};
	const getLongBreakTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideLongBreak());
		dispatch(updateLongBreakTime({ currTime: curValue }));
	};
	const getLongBreakAfterTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideLongBreakAfter());
		dispatch(updateLongBreakAfterTime({ currTime: curValue }));
	};
	////////////////////////////////////
	//Check button handler////////
	const toggleShortBreakSelect = () => {
		if (!shortBreakLengthSelected) {
			dispatch(showShortBreak());
		}
		if (shortBreakLengthSelected) {
			dispatch(hideShortBreak());
		}
	};
	const togglePomodoroSelect = () => {
		if (!pomodoroLengthSelected) {
			dispatch(showMinutes());
		}
		if (pomodoroLengthSelected) {
			dispatch(hideMinutes());
		}
	};
	const toggleLongBreakAfter = () => {
		if (!longBreakAfterLengthSelected) {
			dispatch(showLongBreakAfter());
			console.log(longBreakAfterLengthSelected);
		}
		if (longBreakAfterLengthSelected) {
			dispatch(hideLongBreakAfter());
		}
	};
	const toggleLongBreak = () => {
		if (!longBreakLengthSelected) {
			dispatch(showLongBreak());
			console.log(longBreakLengthSelected);
		}
		if (longBreakLengthSelected) {
			dispatch(hideLongBreak());
		}
	};
	const autoStartNextPomodoroHandler = () => {
		if (!autoStartNextPomodoro) {
			dispatch(enableAutoStartPomodoro());
		}
		if (autoStartNextPomodoro) {
			dispatch(disableAutoStartPomodoro());
		}
	};
	const autoBreakStartHandler = () => {
		if (!autoStartBreak) {
			dispatch(enableAutoStartBreak());
		}
		if (autoStartBreak) {
			dispatch(disableAutoStartBreak());
		}
	};
	const disableBreakHandler = () => {
		if (!goForBreak) {
			dispatch(enableGoForBreak());
		}
		if (goForBreak) {
			dispatch(disableGoForBreak());
		}
	};
	///////TESTING SUSPENSE //////////////////
	const resource = createResource()
	const loadingSpinner = <div className={styles.loadingSpinner}>
			<span className={styles.loader}></span>
		</div>
	return (
		
		<Suspense fallback = {loadingSpinner}>
			<SettingsComponent resource = {resource}/>
		</Suspense>
	
	);
};
export default Settings;
