import React, { useState } from "react"
import styles from "./Settings.module.scss"
import {Link} from "react-router-dom"
import NavButton from "../NavButtons/NavButton"
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import {showMinutes,hideMinutes} from "../Settings/SettingsSlice"
import {useDispatch,useSelector} from "react-redux"
const Settings =  (props) => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.settings.selected)
    const pomodoroMinute = useSelector((state) => state.settings.pomodoroLength)
    // const [selected, setSelected] = useState(false)
    console.log(pomodoroMinute);
    const Minutes = [];
    console.log(Minutes);
    for(let i = 0; i <= 60; i++){
        Minutes.push( i + 1)
    }
    const toggleSelectEl = () => {
        if(selected) {
            dispatch(hideMinutes())
        }
        if(!selected){
            dispatch(showMinutes())
        }
    }
    return (<div className={styles.Setting}>
        <div className={styles.HeaderWrapper}>
            <Link to={-1} className={styles.navLink}><FaChevronLeft className={styles.iconBack}/></Link>
            <h3 className={styles.SettingHeader}>Settings</h3>
        </div>
        <div className={styles.accountDetails}>
            <figure className={styles.Avatar}></figure>
            <div className={styles.userName}>Mr. Somebody</div>
            <FaChevronRight className={styles.iconBack}/>
        </div>
        <div className={styles.projects}>projects</div>
        <div className={styles.AlarmSettings}>
            <div className={styles.linkWrapper}>
                <Link to="workAlarm" className={styles.workAlarm}>Work Alarm</Link>
                <div className={styles.alarmTone}>
                    <span className={styles.alarm}>Bell2</span> 
                    <FaChevronRight className={styles.iconBack}/>
                </div>
            </div>
            <div className={styles.linkWrapper}>
                <Link to="workAlarm" className={styles.workAlarm}>Break Alarm</Link>
                <div className={styles.alarmTone}>
                    <span className={styles.alarm}>Bell3</span> 
                    <FaChevronRight className={styles.iconBack}/>
                </div>
            </div>
            <div className={styles.linkWrapper}>
                <Link to="workAlarm" className={styles.workAlarm}>White Noise</Link>
                <div className={styles.alarmTone}>
                    <span className={styles.alarm}>Bell3</span> 
                    <FaChevronRight className={styles.iconBack}/>
                </div>
            </div>
            
        </div>
        <div className={styles.timeSettingsWrapper}>
            <div className={styles.pomodoroLength}>
                    <span className={styles.typeOfBreak}>Pomodoro Length</span>
                    <div className={styles.pomodoroDuration}>
                        <span>45 Minutes</span> 
                        <FaChevronLeft className={styles.iconBack}/> 
                    </div>
            </div>
            <div className={styles.pomodoroLength}>
                    <span className={styles.typeOfBreak}>Short Break Length</span>
                    <div className={styles.pomodoroDuration}>
                        <span>45 Minutes</span> 
                        <FaChevronLeft className={styles.iconBack}/> 
                    </div>
            </div>
            <div className={styles.pomodoroLength}>
                    <span className={styles.typeOfBreak}>Long Break Length</span>
                    <div className={styles.pomodoroDuration}>
                        <span>45 Minutes</span> 
                        <FaChevronLeft className={styles.iconBack}/> 
                    </div>
            </div>
            
            <div className={styles.pomodoroLength}>
                <span className={styles.typeOfBreak}>Long Break After</span>
                <div className={styles.pomodoroDuration}>
                    <span>45 Minutes</span> 
                    <FaChevronLeft className={styles.iconBack}/> 
                </div>
            </div>
            <form className={styles.minuteList}>
                <label htmlFor ="minutes" className={styles.minutesLabel} onClick = {toggleSelectEl}>
                    <span>Pomodoro Length</span>
                    <span>45 Minutes</span>
                </label>
                {/* <input list = "minutes" id ="minutes" className={styles.minutes}/> */}
                    <select className = {selected ? styles.selectMinutes : styles.hidden} >
                        {
                            Minutes.map((minute,i) => {
                                return <option className={styles.minuteOption} value= {minute} key= {i}>{minute}</option>
                            })
                        }
                    </select>x
            </form>
            {/* <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label" className={styles.inputLabel}>Pomodoro Length</InputLabel>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // value={age}
                        // onChange={handleChange}
                        // label="Age"
                >
                    {
                        Minutes.map((minute,i ) => {
                            return <MenuItem value={minute} key = {i}>{minute}</MenuItem>
                        })
                    }
                    
                    
               </Select>
            </FormControl> */}
            
        </div>
    </div>)
}
export default Settings