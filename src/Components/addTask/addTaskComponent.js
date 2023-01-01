import React,{useRef,useState} from "react";
import style from "./addTask.module.scss";
import { useNavigate } from "react-router";
import {ButtonBack} from "../NavButtons/NavButton";
import { TbArrowsDownUp } from "react-icons/tb";
// import AddTaskInput from "../addTaskInput/addTaskInput"
import PomodoroSetting from "../PomodoroSetting/PomodoroSetting"
import { useDispatch, useSelector } from "react-redux";
import { ImOpt } from "react-icons/im";
import { getProjectT, getProjectTodos,FetchTasks,updateCurrProjectTasks,updateTasksToBeCompleted } from "../Settings/SettingsSlice";
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { hidePomodoroSettings,showPomodoroSettings } from "../PomodoroSetting/PomodoroSettingSlice";
import CompletedTasks from "../CompletedTask/CompletedTask";
import { IoMdArrowDropdown } from "react-icons/io";
import { db } from "../Firebase/Firebase";
import { updateDoc,doc, arrayUnion, increment } from "firebase/firestore";
import { setTriggerPlayFromTask } from "../FrontPage/FrontPageSlice";
import { async } from "@firebase/util";
//////////////////////////////////////////////////
////Add task Component//////////////
/////////To do list ////////////
//1. 
const AddTaskComponent = ({resource}) => {
    // const tasks = resource.tasks.read()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const projects = useSelector(state => state.settings.projects)
  // const tasks = useSelector(state => state.settings.projectTasks)
  // const tasks = useSelector(state => state.settings.tasks)
  const projectTitle = useSelector(state => state.settings.taskHeader)
  const projectCurrTask = useSelector(state => state.settings.projectTasks)
  const projectId = useSelector(state => state.settings.projectId)
  const userId =  useSelector((state) => state.signUpSlice.userId)
  const currTaskObject = useSelector(state => state.settings.currTasks)
  const taskName = useSelector(state => state.settings.clickedProjectIdentitfier)
  const tasksArray = useSelector(state => state.settings.tasks)
  const timeElapsed = useSelector(state => state.settings.elapsedTime)
  const tasksToBeCompleted = useSelector(state => state.settings.tasksToBeCompleted)
  const estimatedTime = useSelector(state => state.settings.estimatedTime)
  const completedTasks = useSelector(state => state.settings.completedTasks)
  const pomodoroCurrLength = useSelector(state => state.settings.pomodoroCurrLength)
  const totalEstimatedTasksTime = useSelector(state => state.settings.totalEstimatedTasksTime)
  const numbSelectedPomodoro = useSelector(state => state.settings.numbSelectedPomodoro)
  const [showUI,setShowUI] = useState(false)
  const [showFinishedTasks,setShowFinishedTask] = useState((false))
 
  console.log(tasksArray)
  const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
   const userTasksRef = doc(db,"users",`${userId}`,`userTasksCollection`,`tasks`)
  const moveToPreviousePage = () => {
    navigate(-1);
  };
  console.log([]);
  const calculateMinutesAndHours = (minutes) => {
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    // const 
    console.log(`Minutes: ${remainingMinutes}minutes, Hours: ${parseInt(hours)}hrs`);
    
    return [parseInt(hours),remainingMinutes]
  }

  const estimatedTimeArray = calculateMinutesAndHours(estimatedTime)
  const timeElapsedArray = calculateMinutesAndHours(timeElapsed)
  /////////Update Tasks in the server ////
  const taskUpdateHandler = async (task,oldTaskObject,updatedTaskArray) => {
    const oldObjectTasksArray = oldTaskObject.tasks
    const newTaskObjectArray =[...updatedTaskArray,task]
    const newTasksObject = {...oldTaskObject,tasks: newTaskObjectArray}
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}`]: newTasksObject
    })
  }
  const incrementTasksTodo = async (tasksToBeCompleted) => {
    const totalTasks = tasksToBeCompleted + 1
    console.log(totalTasks)
    dispatch(updateTasksToBeCompleted())
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksToBeCompleted`]: totalTasks
    })
    
  }
  const decrementTasksTodo = async () => {
   await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksToBeCompleted`]: increment(-1)
    })
  }
  const calcTotalTasksTime = (totalTime,currPomodoroLength,numbSelectedPomodoro) => {
    const totalTasksTime = totalTime + (currPomodoroLength * numbSelectedPomodoro)
    return totalTasksTime
  }
  //Calculate Total Tasks Time
  const totalTasksTime = calcTotalTasksTime(totalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoro)
  const updateTotalTasksTime = async (currTotalTime,index) => {
    const newTotalTime = currTotalTime 
     await updateDoc(userTasksRef,{
      [`projectTasks${[index]}.totalEstimatedTasksTime`]: newTotalTime 

     })
  }

   const inputRef = useRef()
    ///Add task handler////////
    console.log(currTaskObject);
    ///Add task ////
    const handleAddTask = () => {
    if(inputRef.current.value === ""){
      setShowUI(false)
       return
      }
    inputRef.current.blur()
    dispatch(getProjectTodos(inputRef.current.value))
    dispatch(updateCurrProjectTasks(inputRef.current.value))
    taskUpdateHandler(inputRef.current.value,currTaskObject,tasksArray)
    incrementTasksTodo(tasksToBeCompleted)
    dispatch(FetchTasks(userId))
    //1.Get total number of pomodoros 
    //2. Get current pomodorolength
    //3. Calculate total tasks time
    //4. Get total tasks time
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
  const handleStart = () => {
    navigate('/')
    dispatch(setTriggerPlayFromTask())
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
          <div className={style.TaskEstimatedTime}>
            <span>
               {estimatedTimeArray[0] < 10 ? `0${estimatedTimeArray[0]}` : estimatedTimeArray[0]}
            </span>
             <span>:</span>
             <span>
               {estimatedTimeArray[1] < 10 ? `0${estimatedTimeArray[1]}` : estimatedTimeArray[1]}
             </span>
          </div>
          <span className={style.TaskTimeUnit}>Estimated Time</span>
        </div>
        <div className={style.TaskTobeCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskTobeCompleted}>{tasksToBeCompleted}</div>
          <span className={style.TaskTimeUnit}>Tasks todo</span>
        </div>
        <div className={style.ElapsedTimeWrapper}>
          <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>HH</span>
            <span className={style.TaskTimeUnit}>MM</span>
          </div>
          <div className={style.TaskEstimatedTime}>
            <span>
               {timeElapsedArray[0] < 10 ? `0${timeElapsedArray[0]}` : timeElapsedArray[0]}
            </span>
             <span>:</span>
             <span>
              
                {timeElapsedArray[1] < 10 ? `0${timeElapsedArray[1]}` : timeElapsedArray[1]}
              
             </span>
          </div>
          <span className={style.TaskTimeUnit}>Elasped Time</span>
        </div>
        <div className={style.TaskCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskEstimatedTime}>{completedTasks}</div>
          <span className={style.TaskTimeUnit}>Completed Tasks</span>
        </div>
      </div>
      
      
    <input type = "text" placeholder="+ Add a task..." 
        className={ style.addTaskInputNotFocused }
        ref={inputRef}
       onClick={() => setShowUI(true)}
        />
         
     <div className={style.tasksWrapper}>
        {tasksArray.length > 0 ? tasksArray.map((task, i) => {
        return (<div className={style.taskContainer} key ={i}>
          {/* <ImBin className={style.trashBin}/> */}
          <div className={style.circle} onClick = {handleComplete}></div>
           <div className={style.task}>
            <span>{task}</span>
            <span onClick={handleStart}>Play</span>
          </div>
        </div>)
      } ) : null}
      </div>
      <div className={style.hideShowFinishedTaskContainer} onClick ={toggleDisplay}>
        <div className={style.hideShowFinishedTask}>
          <span >{showFinishedTasks ? "Hide" : "Show"} completed tasks </span>
          <IoMdArrowDropdown className={style.dropDownIcon}/>
        </div>
      </div>
      <CompletedTasks showFinishedTasks={showFinishedTasks} projectCurrTask ={projectCurrTask}/>
     <PomodoroSetting showUI ={showUI} handleAddTask={handleAddTask}/>
    </div>
  );
}
;

export default AddTaskComponent;
