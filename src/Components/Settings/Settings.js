import React, { useState, useRef } from 'react';
import styles from './Settings.module.scss';
import { Link } from 'react-router-dom';
import NavButton from '../NavButtons/NavButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
	updateShortBreakTime
} from '../Settings/SettingsSlice';
import { useDispatch, useSelector } from 'react-redux';
const Settings = (props) => {
	///////////////////
	///GLOBALS/////////
	const dispatch = useDispatch();
	////Select Display states/////
	const selected = useSelector((state) => state.settings.selected);
	const pomodoroLengthSelected = useSelector((state) => state.settings.pomodoroLengthSelected);
	const shortBreakLengthSelected = useSelector((state) => state.settings.shortBreakLengthSelected);
	const longBreakLengthSelected = useSelector((state) => state.settings.longBreakLengthSelected);
	const longBreakAfterLengthSelected = useSelector((state) => state.settings.longBreakAfterSelected);
	/// Get Pomodoro Durations //////
	const pomodoroCurrLength = useSelector((state) => state.settings.pomodoroCurrLength);
	const shortBreakCurrLength = useSelector((state) => state.settings.shortBreakCurrLength);
	const longBreakCurrLength = useSelector((state) => state.settings.longBreakCurrLength);
	const longBreakAfterCurrLength = useSelector((state) => state.settings.longBreakAfterCurrLength);
	///////////////////////////////
	const selectRef = useRef();
	const Minutes = [];
	let selectedTime = 45;
	for (let i = 0; i <= 60; i++) {
		Minutes.push(i + 1);
	}
	console.log(pomodoroLengthSelected);
	const togglePomodoroSelect = () => {
		if (!pomodoroLengthSelected) {
			dispatch(showMinutes());
		}
		if (pomodoroLengthSelected) {
			dispatch(hideMinutes());
		}
	};
	const toggleShortBreakSelect = () => {
		if (!shortBreakLengthSelected) {
			dispatch(showShortBreak());
		}
		if (shortBreakLengthSelected) {
			dispatch(hideShortBreak());
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
	return (
		<div className={styles.Setting}>
			<div className={styles.HeaderWrapper}>
				<Link to={-1} className={styles.navLink}>
					<FaChevronLeft className={styles.iconBack} />
				</Link>
				<h3 className={styles.SettingHeader}>Settings</h3>
			</div>
			<div className={styles.accountDetails}>
				<figure className={styles.Avatar} />
				<div className={styles.userName}>Mr. Somebody</div>
				<FaChevronRight className={styles.iconBack} />
			</div>
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
				{/* <div className={styles.pomodoroLength}>
					<span className={styles.typeOfBreak}>Long Break After</span>
					<div className={styles.pomodoroDuration}>
						<span>45 Minutes</span>
						<FaChevronLeft className={styles.iconBack} />
					</div>
				</div>  */}
				<form className={styles.minuteList}>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={togglePomodoroSelect}>
						<span>Pomodoro Length</span>
						<span>{pomodoroCurrLength} Minutes</span>
					</label>
					<select
						className={pomodoroLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={getPomodoroTime}
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
						<span>{shortBreakCurrLength} Minutes</span>
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
						<span>{longBreakCurrLength} Minutes</span>
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
						<span>{longBreakAfterCurrLength} Pomodoros</span>
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
				</form>
			</div>
		</div>
	);
};
export default Settings;
