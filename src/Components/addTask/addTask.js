import React,{useRef,useState,Suspense} from "react";
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
import CompletedTasks from "../CompletedTask/CompletedTask";
import { IoMdArrowDropdown } from "react-icons/io";
import AddTaskComponent from "./addTaskComponent";
import { createResource } from "../PersonApi/PersonApi";

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const projects = useSelector(state => state.settings.projects)
  const tasks = useSelector(state => state.settings.tasks)
  const projectTitle = useSelector(state => state.settings.taskProjectTitle)
  const projectCurrTask = useSelector(state => state.settings.projectTasks)
  const [showUI,setShowUI] = useState(false)
  const [showFinishedTasks,setShowFinishedTask] = useState((false))
  
  const moveToPreviousePage = () => {
    navigate(-1);
  };
   const inputRef = useRef()
    ///Add task handler////////
    const handleAddTask = () => {
    if(inputRef.current.value === ""){
      setShowUI(false)
       return
      }
    inputRef.current.blur()
    dispatch(getProjectCurrTasks(inputRef.current.value))
    setShowUI(false)
    inputRef.current.value = ""
    // dispatch(hidePomodoroSettings())
  }
  const handleComplete = () => {
    console.log("clicked");
  }
  const toggleDisplay = () => {
    if(showFinishedTasks) {
      setShowFinishedTask(false)
    }
    else{
      setShowFinishedTask(true)
    }
  }
  const resource = createResource()
	const loadingSpinner = <div className={style.loadingSpinner}>
			<span className={style.loader}></span>
		</div>
  return (
    <Suspense fallback = {loadingSpinner} >
      <AddTaskComponent resource = {resource}/>
    </Suspense>
  );
}
;

export default AddTask;
