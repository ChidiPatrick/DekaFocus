import React, { useRef, useState } from 'react'
import style from "./PomodoroSetting.module.scss"
import { FaStopwatch,FaAngleRight,FaCaretRight} from "react-icons/fa";
import { SlArrowRight } from "react-icons/im";
import { TbFlag } from "react-icons/tb";
import {useDispatch,useSelector} from "react-redux"
import {showStopWatchIcon,blurStopWatchIcon} from "../PomodoroSetting/PomodoroSettingSlice"
// import classames from "./classnames"
const PomodoroSetting = (props) => {
    const iconState = useSelector((state) => state.PomodoroSetting.stopWatchIcon)
    const dispatch = useDispatch()
    const [clicked,setClicked] = useState(false)
    const iconRef = useRef()
   const stopWatchIconClicked = (e) => {
        // setClicked(true)
        console.log(e.target);
        if(iconState) {
            console.log(iconState);
            dispatch(blurStopWatchIcon())
        }else{
            dispatch(showStopWatchIcon())
            console.log(iconState);
        }
        console.log(iconRef.current);
   }
   const numbStopWatchIcons = [1,2,3,4,5,6]

    return (
        <div className={style.PomodoroSettingWrapper}>
            <h6 className={style.PomodoroSettingHeader}>Estimated Pomodoros</h6>
            <div className={style.stopWatchIconWrapper} >
                {numbStopWatchIcons.map((icon,i) => {
                    return  <FaStopwatch key={i} className={iconState ? style.stopWatchIconClicked : style.stopWatchIcon} 
                    onClick={stopWatchIconClicked} />
                })}
            
            </div>
            <div className={style.taskSetting} >
                <div className={style.taskIcon}>Task Icon</div>
                <TbFlag className={style.flagIcon}/>
                <div className={style.tag}>Tag</div>
                <div className={style.Task}>Task</div>
                <button className= {style.doneBtn}>Done</button>
            </div>
        </div>
    )
}
export default PomodoroSetting