import React,{useRef} from "react";
import style from "./addTask.module.scss";
import { useNavigate } from "react-router";
import {ButtonBack} from "../NavButtons/NavButton";
import { TbArrowsDownUp } from "react-icons/tb";
// import AddTaskInput from "../addTaskInput/addTaskInput"
import PomodoroSetting from "../PomodoroSetting/PomodoroSetting"
import { useDispatch, useSelector } from "react-redux";
import { ImOpt } from "react-icons/im";
import { getProjectCurrTasks } from "../Settings/SettingsSlice";
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { hidePomodoroSettings,showPomodoroSettings } from "../PomodoroSetting/PomodoroSettingSlice";
const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const projects = useSelector(state => state.settings.projects)
  const tasks = useSelector(state => state.settings.tasks)
  const projectTitle = useSelector(state => state.settings.taskProjectTitle)
  const projectCurrTask = useSelector(state => state.settings.projectTasks)
  const moveToPreviousePage = () => {
    navigate(-1);
  };
   const inputRef = useRef()
    ///Add task handler////////
    const handleAddTask = () => {
    inputRef.current.blur()
    if(inputRef.current.value === "") return
    dispatch(getProjectCurrTasks(inputRef.current.value))
    inputRef.current.value = ""
    dispatch(hidePomodoroSettings())
  }
  const handleComplete = () => {
    console.log("clicked");
  }
  return (
    <div className={style.TaskWrapper}>
      <div className={style.TaskHeaderWrapper}>
        <ButtonBack/>
        {/* <button className={style.backBtn} onClick={moveToPreviousePage}>
          <HiChevronLeft className={style.navigateBackIcon} />
        </button> */}
        <h2 className={style.TaskHeader}>{projectTitle.length > 20 ? projectTitle.slice(0,17).padEnd(20,"."): projectTitle}</h2>
        <button className={style.sort} >
          <TbArrowsDownUp />
        </button>
      </div>
      <div className={style.TaskTimeWrapper}>
        <div className={style.TaskTimeEstimateWrapper}>
          <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>HH</span>
            <span className={style.TaskTimeUnit}>MM</span>
          </div>
          <div className={style.TaskEstimatedTime}>{tasks.estimatedTime}</div>
          <span className={style.TaskTimeUnit}>Estimated Time</span>
        </div>
        <div className={style.TaskTobeCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskTobeCompleted}>{tasks.tasksToBeCompleted}</div>
          <span className={style.TaskTimeUnit}>Tasks todo</span>
        </div>
        <div className={style.ElapsedTimeWrapper}>
          <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>HH</span>
            <span className={style.TaskTimeUnit}>MM</span>
          </div>
          <div className={style.TaskEstimatedTime}>{tasks.elaspedTime}</div>
          <span className={style.TaskTimeUnit}>Elasped Time</span>
        </div>
        <div className={style.TaskCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskEstimatedTime}>{tasks.completedTasks}</div>
          <span className={style.TaskTimeUnit}>Completed Tasks</span>
        </div>
      </div>
      
      
    <input type = "text" placeholder="+ Add a task..." 
        className={ style.addTaskInputNotFocused }
        ref={inputRef}
       onClick={dispatch(showPomodoroSettings())}
        />
     <div className={style.tasksWrapper}>
        {projectCurrTask.map((task, i) => {
        return (<div className={style.taskContainer}>
          {/* <ImBin className={style.trashBin}/> */}
          <div className={style.circle} onClick = {handleComplete}></div>
           <div className={style.task}>{task}</div>
        </div>)
      } )}
      </div>
      <PomodoroSetting handleAddTask={handleAddTask}/>
    </div>
  );
}
;

export default AddTask;
