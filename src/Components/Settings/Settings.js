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
import { async } from '@firebase/util';
import { ClipLoader } from 'react-spinners/ClipLoader';

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
		const [value,loading,error,reload] = useDocumentOnce(doc(db,"users",`${userId}`,"userSettingsCollection","settings"),
		{
			snapshotListenOptions: {includeMetaChanges: true},
			source: "server"
		}
		)
		///////Settings handlers ////////////////
		const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
		const updatePomodoroLength = async (e) =>  {
			await updateDoc(settingsRef, {
				pomodoroLength: e.target.value
			});
			reload()
		}
		const autoStartBreakHandler = async (e) => {
			await updateDoc(settingsRef, {
				autoStartBreaks: e.target.value
			});
			reload()
		}
		
	
	
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
	const loadingSpinner = <p>Loading...</p>
	// const settingsUI = 
	return (
		<div className={styles.Setting}>
			<div className={styles.HeaderWrapper}>
				<Link to={'/userAccount'} className={styles.navLink}>
					<FaChevronLeft className={styles.iconBack} />
				</Link>
				<h3 className={styles.SettingHeader}>Settings</h3>
			</div>
			<Link to="/userAccount" className={styles.accountDetails}>
				<figure className={styles.Avatar} />
				<div className={styles.userName}>Mr. Somebody</div>
				<FaChevronRight className={styles.iconBack} />
			</Link>
			<div className={styles.projects}>projects</div>
			<div className={styles.AlarmSettings}>
				<div className={styles.linkWrapper}>
					<Link to="workAlarm" className={styles.workAlarm}>
						Work Alarm
					</Link>
					<div className={styles.alarmTone}>
						<span className={styles.alarm}>Bell2</span>
						<FaChevronRight className={styles.iconBack} />
					</div>
				</div>
				<div className={styles.linkWrapper}>
					<Link to="workAlarm" className={styles.workAlarm}>
						Break Alarm
					</Link>
					<div className={styles.alarmTone}>
						<span className={styles.alarm}>Bell3</span>
						<FaChevronRight className={styles.iconBack} />
					</div>
				</div>
				<div className={styles.linkWrapper}>
					<Link to="workAlarm" className={styles.workAlarm}>
						White Noise
					</Link>
					<div className={styles.alarmTone}>
						<span className={styles.alarm}>Bell3</span>
						<FaChevronRight className={styles.iconBack} />
					</div>
				</div>
			</div>
			<div className={styles.timeSettingsWrapper}>
				<form className={styles.minuteList}>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={togglePomodoroSelect}>
						<span>Pomodoro Length</span>
					{error && <div style={{color: "red"}}>Connectivity Error!</div>}
					{loading && <Spinner/>}
					{value && <span>{value.data().pomodoroLength} Minutes</span>}
					</label>
					<select
						className={pomodoroLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updatePomodoroLength}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>

					<label htmlFor="minutes" className={styles.minutesLabel} onClick={toggleShortBreakSelect}>
					<span>Short Break Length</span>
					{error && <div style={{color: "red"}}>Connection Error!</div>}
					{loading && <Spinner/>}
					{value && <span>{value.data().shortBreakLength} Minutes</span>}
					</label>
					<select
						className={shortBreakLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={getShortBreakTime}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={toggleLongBreak}>
						<span>Long Break Length</span>
					{error && <div style={{color: "red"}}>Connection Error!</div>}
					{loading && <Spinner/>}
					{value && <span>{value.data().longBreakLength} Minutes</span>}
					</label>
					<select
						className={longBreakLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={getLongBreakTime}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={toggleLongBreakAfter}>
						<span>Long Break After</span>
					{error && <div style={{color: "red"}}>Connection Error!</div>}
					{loading && <Spinner/>}
					{value && <span>{value.data().longBreakAfter} Pomodoros</span>}
					</label>
					<select
						className={longBreakAfterLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={getLongBreakAfterTime}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>
					<label className={styles.breakSwitch}>
						<span className={styles.switchLabel}>Disable Break</span>
						{error && <div style={{color: "red"}}>Connection Error!</div>}
					{loading && <Spinner/>}
					{value && <Switch
							className={styles.switch}
							height={17}
							width={40}
							onChange={disableBreakHandler}
							checked={value.data().disableBreak}
							/>}
						
					</label>
					<label className={styles.AutoStartPomodoroSwitch}>
						<span className={styles.switchLabel}>Auto Start of Next Pomodoro</span>
					{error && <div style={{color: "red"}}>Connection Error!</div>}
					{loading && <Spinner/>}
					{value &&<Switch
							className={styles.switch}
							height={17}
							width={40}
							checked={value.data().autoStartNextPomodoro}
							onChange={autoStartNextPomodoroHandler}
						/> }
						
					</label>
					<label className={styles.AutoStartBreakSwitch}>
						<span className={styles.switchLabel}>Auto Start of Break</span>
					{error && <div style={{color: "red"}}>Connection Error!</div>}
					{loading && <Spinner/>}
					{value &&  <Switch
							className={styles.switch}
							height={17}
							width={40}
							checked={value.data().autoStartBreaks}
							onChange={autoBreakStartHandler}
							// color="#ccc"
						/>}
					</label>
					{/* <Switch color="red" /> */}
				</form>
			</div>
		</div>
	);
};
export default Settings;
