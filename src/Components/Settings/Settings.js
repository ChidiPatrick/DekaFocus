import React, { useState, useRef,useEffect,Suspense } from 'react';
import styles from './Settings.module.scss';
import { Link } from 'react-router-dom';
import NavButton from '../NavButtons/NavButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {useCollection, useDocument, useDocumentData, useDocumentOnce} from "react-firebase-hooks/firestore"
import { db,auth,app,storage } from '../Firebase/Firebase';
import {doc,collection,getDoc,updateDoc} from "firebase/firestore"
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Spinner from '../Spinner/Spinner';
import Projects from '../Projects/Projects';
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
	getUserSettings,
	setUserAvatarURL
	
} from '../Settings/SettingsSlice';
import { fetchUserSettings } from '../Settings/SettingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import Switch from '@mui/material/Switch';
// import { Switch } from 'evergreen-ui';
import { ClipLoader } from 'react-spinners/ClipLoader';
import { createResource } from '../PersonApi/PersonApi';
import SettingsComponent from './settingsComponent';
import  Avatar  from 'react-avatar';
import {ref,getDownloadURL,uploadBytesResumable} from "@firebase/storage"
import FrontPage from '../FrontPage/FrontPage';


const Settings = (props) => {	
onAuthStateChanged(auth, (user) => {
	console.log(user.id);
})
	///////////////////
	//HOOKS//
	const [ checked, setChecked ] = useState(false);
	const [selectedFile,setSelectedFile] = useState(null)
	const [imgUrl,setImgUrl] = useState("")
	// const []
	const [loadingPercentage,setLoadingPercentage] = useState(`${0}%`)
	///GLOBALS/////////
	const dispatch = useDispatch();
	////Select Display states/////
	console.log(selectedFile);
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
	const workAlarm = useSelector(state => state.tones.workAlarm)
	const breakAlarm = useSelector(state => state.tones.breakAlarm)
	const userId = useSelector((state) => state.signUpSlice.userId)
	const [settings,setSettings] = useState(userSettings)
	const userBioData = useSelector(state => state.settings.userBioData)
	const userAvatarURL = useSelector(state => state.settings.userAvatarURL)
	const [avatarFile,setAvatarFile] = useState("No file")
	//////////////////////////////////////
	// const [user, loading, error ] = useAuthState(auth)
	const formHandler = (e) => {
		e.preventDefault();
		const file = e.target[9]
		console.log(file );
	}
	dispatch(getUserSettings())
	let userData = []
	console.log(userBioData);
	// const usersId = localStorage.getItem("userId")
	console.log(userSettings);
	/////Get data function	
    const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
	/////// Settings handlers ////////////////
	
	////////////////////////////////////
	const selectRef = useRef();
	const Minutes = [];
	let selectedTime = 45;
	for (let i = 0; i <= 60; i++) {
		Minutes.push(i + 1);
	}
	const avatarRef = useRef()
	const handleChnage = (e) => {
		setSelectedFile(e.target.files[0])

	}
	const uploadTask = async(selectedFile) => {
		if(!selectedFile) return
		const storageRef = ref(storage, `/usersAvatars/${selectedFile.name}`)
		const  uploadAvatar = uploadBytesResumable(storageRef, selectedFile)
		uploadAvatar.on("state_changed", (snapshot) => {
			const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			setLoadingPercentage(progress)
		},(error) => {
			console.log(error);
		},
		() => {
			getDownloadURL(uploadAvatar.snapshot.ref).then((downloadURL) => {
				dispatch(setUserAvatarURL(downloadURL))
				setImgUrl(downloadURL)
			})
		})
	} 
	console.log(imgUrl);
	///////////////////////////////////
	//GET SELECTED MINUTE
	const getPomodoroTime = (e) => {
		dispatch(hideMinutes());
		dispatch(updatePomodoroTime(e.target.value));
	};
	const getShortBreakTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideShortBreak());
		dispatch(updateShortBreakTime(e.target.value));
	};
	const getLongBreakTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideLongBreak());
		dispatch(updateLongBreakTime(e.target.value));
	};
	const getLongBreakAfterTime = (e) => {
		
		dispatch(hideLongBreakAfter());
		dispatch(updateLongBreakAfterTime(e.target.value));
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
	const updatePomodoroLength = async (e) =>  {
			getPomodoroTime(e)
			togglePomodoroSelect()
			await updateDoc(settingsRef, {
				pomodoroLength: e.target.value
			});
			dispatch(getUserSettings())
			
			// 
		}
		const updateShortBreakLength = async (e) => {
			getShortBreakTime(e)
			toggleShortBreakSelect()
			await updateDoc(settingsRef, {
				shortBreakLength: e.target.value
			});
			dispatch(getUserSettings())
			
		}
		const updateLongBreakLength = async (e) => {
			getLongBreakTime(e)
			toggleLongBreak()
			await updateDoc(settingsRef, {
				longBreakLength: e.target.value
			})
			dispatch(getUserSettings())
		}
		const updateLongBreakAfter = async  (e) => {
			getLongBreakAfterTime(e)
			toggleLongBreakAfter()
			await updateDoc(settingsRef, {
				longBreakAfter: e.target.value
			})
			dispatch(getUserSettings())
		}
		const updateAutoStartBreak = async (e) => {
			await updateDoc(settingsRef, {
				autoStartBreaks: settings.disableBreak
			});
			
		}
		
	///////TESTING SUSPENSE //////////////////
	const resource = createResource()
	const loadingSpinner = <div className={styles.loadingSpinner}>
			<span className={styles.loader}></span>
		</div>
	return (
		//  <Suspense fallback= {loadingSpinner}>
		// 	<SettingsComponent resource = {resource}/>
		//   </Suspense>
		<div className={styles.Setting}>
			<div className={styles.HeaderWrapper}>
				<Link to= "/userAccount" className={styles.navLink}>
					<FaChevronLeft className={styles.iconBack} />
				</Link>
				<h3 className={styles.SettingHeader}>Settings</h3>
			</div>
			<Link to="/userAccount" className={styles.accountDetails}>
			<figure className = {styles.avatarImage}>
				{/* <div className={styles.avatarImage}>
				<label htmlFor='avatar' >Add File</label>
				<input 
					type="file" 
					ref ={avatarRef} 
					placeholder='Add' 
					id = "avatar" 
					className={styles.Avatar} 
					name = "User Avater" 
					accept = "image/png,image/jpg"
					onChange ={getFileLink}
					/>
				
				</div> */}
				<img src={userAvatarURL} alt ="user avater" className={styles.userAvatar}/>
			 </figure>
				<div className={styles.userName}>{userBioData.firstName} {userBioData.lastName} </div>
				<FaChevronRight className={styles.iconBack} />
			</Link>
			<Link to ="/Projects" className={styles.projectsLink}>
				<div className={styles.projectLinkContainer}>
					<p>Projects</p>
					<FaChevronRight className={styles.iconBack} />
				</div>
			</Link>
			<div className={styles.AlarmSettings}>
					<Link to="workAlarm" className={styles.linkWrapper}>
						<div>Work Alarm</div>
						<div className={styles.alarmTone}>
						<span className={styles.alarm}> {settings ? settings.workAlarm : workAlarm} </span>
						<FaChevronRight className={styles.iconBack} />
						</div>
					</Link>
	
					<Link to="breakAlarm" className={styles.linkWrapper}>
						<div>Break Alarm</div>
						<div className={styles.alarmTone}>
						<span className={styles.alarm}>{settings ? settings.breakAlarm : breakAlarm }</span>
						<FaChevronRight className={styles.iconBack} />
						</div>
					</Link>
	
					<Link to="workAlarm" className={styles.linkWrapper}>
						<div>White Noise</div>
						<div className={styles.alarmTone}>
						<span className={styles.alarm}>Bell3</span>
						<FaChevronRight className={styles.iconBack} />
						</div>
					</Link>
			</div>
			<div className={styles.timeSettingsWrapper}>
				<form className={styles.minuteList} onSubmit = {formHandler}>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={togglePomodoroSelect}>
						<span>Pomodoro Length</span>
						<span>{settings ? settings.pomodoroLength : pomodoroCurrLength} Minutes</span>
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
						<span>{settings ? settings.shortBreakLength : shortBreakCurrLength} Minutes</span>
					</label>
					<select
						className={shortBreakLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updateShortBreakLength}
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
						<span>{settings ? settings.longBreakLength : longBreakCurrLength} Minutes</span>
					</label>
					<select
						className={longBreakLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updateLongBreakLength}
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
						<span>{settings ? settings.longBreakAfter : longBreakAfterCurrLength} Pomodoros</span>
					</label>
					<select
						className={longBreakAfterLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updateLongBreakAfter}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>
			 {/* <form onSubmit = {getFileLink}>
				<div className={styles.avatarImage}>
				<label htmlFor='avatar' >Add File</label>
				<input 
					type="file" 
					ref ={avatarRef} 
					placeholder='Add' 
					id = "avatar" 
					className={styles.Avatar} 
					name = "User Avater" 
					accept = "image/png,image/PNG,image/jpg,image/JPG"
					// onChange ={(e) => getFileLink(e)}
					/>
				</div>
			 </form> */}
			 <input type= "file" onChange={handleChnage}  className = {styles.input}/>
				<button type = "submit" onClick={() => uploadTask(selectedFile)}>Upload</button>
				<div>Uploaded {loadingPercentage}</div>
				{/* <div>{selectedFile}</div> */}
				</form>
			</div>
		</div>
	);
};
export default Settings;
