import React,{useRef,useState,useEffect} from "react";
import style from "./addTask.module.scss";
import { useNavigate } from "react-router";
import {ButtonBack} from "../NavButtons/NavButton";
import { TbArrowsDownUp } from "react-icons/tb";
// import AddTaskInput from "../addTaskInput/addTaskInput"
import PomodoroSetting from "../PomodoroSetting/PomodoroSetting"
import { useDispatch, useSelector } from "react-redux";
import { ImOpt } from "react-icons/im";
import { 
  getProjectT, 
  getProjectTodos,
  FetchTasks,
  updateCurrProjectTasks,
  increaseTasksToBeCompleted,
  setTotalEstimatedTaskTime,
  setTasksHourMinutesArray,
  setCompletedTasks,
  updateProjectTasks, 
  setCompletedTasksArray,
  setNumSelectedPomodoro,
  setTasksTimesArray,
  setCurrTasks,
  reduceTasksToBeCompleted
} from "../Settings/SettingsSlice";
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
  const numbSelectedPomodoros = useSelector(state => state.settings.numbSelectedPomodoro)
  // const tasksHoursMinutesArray = useSelector(state => state.settings.tasksHourMinutesArray)
  const [tasksHoursMinutesArray,setTasksHoursMinutesArray] = useState(calculateMinutesAndHours(calcTotalTasksTime(totalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoros)))
  const completedTasksArray = useSelector(state => state.settings.completedTasksArray)
  const tasksTimesArray = useSelector(state => state.settings.tasksTimesArray)
  const [showUI,setShowUI] = useState(false)
  const [showFinishedTasks,setShowFinishedTask] = useState((false))
  const finishedTasksArray = []
   const userTasksRef = doc(db,"users",`${userId}`,`userTasksCollection`,`tasks`)
   ///////////////////////////////////////////////////////////////
   console.log(completedTasksArray)
//  const tasksHoursMinutesArray =   calculateMinutesAndHours(calcTotalTasksTime(totalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoros))
  const moveToPreviousePage = () => {
    navigate(-1);
  };
  useEffect(() =>{
    const cleanUp = () => {
      dispatch(setNumSelectedPomodoro(0))
    }
    return cleanUp
  },[totalEstimatedTasksTime])
  function calculateMinutesAndHours(minutes){
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    dispatch(setTasksHourMinutesArray([parseInt(hours),remainingMinutes]))
    return [parseInt(hours),remainingMinutes]
  }
  function calcTotalTasksTime(totalTime,currPomodoroLength,numbSelectedPomodoro) {
    const totalTasksTime = totalTime + (currPomodoroLength * numbSelectedPomodoro)
    console.log(totalTasksTime);
    return totalTasksTime
  }
  const updateTasksHourMinutesArray = (minutes) => {
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    setTasksHoursMinutesArray([parseInt(hours),remainingMinutes])
  }
  const addTaskTimeToTasksTimesArray = async (tasksTimesArray,currPomodoroLength,numbSelectedPomodoros) => {
    const newTime = currPomodoroLength * numbSelectedPomodoros
    const newArray = [...tasksTimesArray,newTime]
    dispatch(setTasksTimesArray(newArray))
    // console.log(`New Time: ${newTime} /n New Time Array: ${newArray}, Old array: ${tasksTimesArray}`);
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksTimesArray`]: newArray
    })
  }
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
    dispatch(increaseTasksToBeCompleted())
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksToBeCompleted`]: totalTasks
    })
  }
  const decrementTasksTodo = async (tasksToBeCompleted) => {
    if(tasksToBeCompleted === 0) return
    const newTasksToBeCompletedNum = tasksToBeCompleted - 1
   dispatch(reduceTasksToBeCompleted(newTasksToBeCompletedNum))
   await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksToBeCompleted`]: newTasksToBeCompletedNum
    })
  }
  const removeTaskTime = async (tasksTimesArray,taskTimeIndex) => {
    const newTasksTimesArray = tasksTimesArray.filter((tasksTimes,index) => taskTimeIndex !== index)
    const newTotalEstimatedTasksTime = newTasksTimesArray.reduce((firstValue,secondValue) => firstValue + secondValue,0)
    dispatch(setTotalEstimatedTaskTime(newTotalEstimatedTasksTime))
    setTasksHoursMinutesArray(newTasksTimesArray)
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksTimesArray`]: newTasksTimesArray
    })
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.totalEstimatedTasksTime`]: newTotalEstimatedTasksTime
    })
  }
  const decreaseTotalEstimatedTasksTime = async (taskIndex,totalEstimatedTasksTime,tasksTimesArray) =>{
    if(totalEstimatedTasksTime === 0) return
    if(tasksTimesArray.length < 1) {
      return
    }
    let newTotalEstimatedTasksTime = totalEstimatedTasksTime - tasksTimesArray[taskIndex]
    if(newTotalEstimatedTasksTime >= 0){
      dispatch(setTotalEstimatedTaskTime(newTotalEstimatedTasksTime))
      await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.totalEstimatedTasksTime`]: newTotalEstimatedTasksTime
    })
    }
    else {
      dispatch(setTotalEstimatedTaskTime(0))
      await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.totalEstimatedTasksTime`]: 0
    })
    }
    
    // dispatch(FetchTasks(userId))
  }
  
  console.log(totalEstimatedTasksTime);
  //Calculate Total Tasks Time
  
  const updateTotalTasksTime = async (totalTasksTime) => {
    dispatch(setTotalEstimatedTaskTime(totalTasksTime))
     await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.totalEstimatedTasksTime`]: totalTasksTime

     })
  }

   const inputRef = useRef()
    ///Add task handler////////
    console.log(currTaskObject);
    ///Handle   Add task ////
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
    const totalTasksTime = calcTotalTasksTime(totalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoros)
    calculateMinutesAndHours(totalTasksTime)
    updateTasksHourMinutesArray(totalTasksTime)
    updateTotalTasksTime(totalTasksTime)
    addTaskTimeToTasksTimesArray(tasksTimesArray,pomodoroCurrLength,numbSelectedPomodoros)
    setShowUI(false)
    inputRef.current.value = ""
    
  }
  const updateCurrTasksArray = (currTasksArray,taskIndex) => {
    const newTasksArray =  currTasksArray.filter((task,index) => index !== taskIndex) 
    console.log(newTasksArray);
    dispatch(updateProjectTasks(newTasksArray))
   
  }
  const updateCompletedTasksArray = async (newCompletedTasksArray) => {
     await updateDoc(userTasksRef,{
    [`projectsTasks.${taskName}.completedTasksArray`]: newCompletedTasksArray
     })
  }
  const removeAndUpdateTaskFromTasksArray = async (taskIndex,tasksArray,completedTasksArray) => {
    const newCompletedTasksArray = [...completedTasksArray,tasksArray[taskIndex]]
    dispatch(setCompletedTasksArray(newCompletedTasksArray))
   const newTasksArray = tasksArray.filter((task,index) => index !== taskIndex)
   console.log(newTasksArray);
   dispatch(setCurrTasks(newTasksArray))
   await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasks`]: newTasksArray
     })
    // updateCompletedTasksArray(newCompletedTasksArray)
  }
  const handleComplete = async (index,totalEstimatedTasksTime,tasksTimesArray,tasksArray,completedTasksArray) => {
    const newTasksArray = [...completedTasksArray,tasksArray[index]]
    dispatch(setCompletedTasksArray(newTasksArray))
    updateCurrTasksArray(tasksArray,index)
    const numCompletedTasks = completedTasks + 1
    dispatch(setCompletedTasks(numCompletedTasks))
    decreaseTotalEstimatedTasksTime(index,totalEstimatedTasksTime,tasksTimesArray)
   removeTaskTime(tasksTimesArray,index)
   removeAndUpdateTaskFromTasksArray(index,tasksArray,completedTasksArray)
   decrementTasksTodo(tasksToBeCompleted)
   await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.completedTasks`]: increment(1),
     })
      await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.completedTasksArray`]: newTasksArray

     })
   
   navigate(0)
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
               {tasksHoursMinutesArray[0] < 10 ? `0${tasksHoursMinutesArray[0]}` : tasksHoursMinutesArray[0]}
            </span>
             <span>:</span>
             <span>
               {tasksHoursMinutesArray[1] < 10 ? `0${tasksHoursMinutesArray[1]}` : tasksHoursMinutesArray[1]}
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
               {tasksHoursMinutesArray[0] < 10 ? `0${tasksHoursMinutesArray[0]}` : tasksHoursMinutesArray[0]}
            </span>
             <span>:</span>
             <span>
              
                {tasksHoursMinutesArray[1] < 10 ? `0${tasksHoursMinutesArray[1]}` : tasksHoursMinutesArray[1]}
              
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
          <div className={style.circle} onClick = {() => handleComplete(i,totalEstimatedTasksTime,tasksTimesArray,tasksArray,completedTasksArray)}></div>
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
      <CompletedTasks showFinishedTasks={showFinishedTasks} completedTasksArray = {completedTasksArray}/>
     <PomodoroSetting showUI ={showUI} handleAddTask={handleAddTask}/>
    </div>
  );
}
;

export default AddTaskComponent;
