import React from "react"
import styles from "./Settings.module.scss"
import {Link} from "react-router-dom"
import NavButton from "../NavButtons/NavButton"
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
const Settings =  (props) => {
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
        </div>
    </div>)
}
export default Settings