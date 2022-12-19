import React,{useState,useRef} from "react";
import { Link } from "react-router-dom";
import styles from "./AddProject.module.scss"
import ButtonDone from "../ButtonDone/ButtonDone";
import {CirclePicker} from "react-color"

import ProjectInput from "./ProjectInput/ProjectInput";
import { useDispatch,useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import uuid from "react-uuid"
import { addProject,activateProjectBtn,deActivateProjectBtn,createProject } from "./AddProjectSlice";
// import { } from "firebase/firestore";
import { createUserCollection } from "../Firebase/Firebase";
import { db, } from "../Firebase/Firebase";
import { addDoc,setDoc,doc,collection,getDoc,updateDoc, arrayUnion } from "firebase/firestore";
import { fetchUserSettings } from "../Settings/SettingsSlice";
////////////////////////////////////////////////////////////////
///Addproject Component
const AddProject = ({title = "New Project"}) => {
    const userId =  useSelector((state) => state.signUpSlice.userId)
    const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
     const showBtn = useSelector(state => state.AddProject.showProjectBtn)
    const [blockPickerColor,setBlockPickerColor] = useState("#eee")
    const inputRef = useRef()
    const dispatch = useDispatch()
    const [disable, setDisAble] = useState(false)
    const addProject = async () => {
        await updateDoc(settingsRef,{
            projects: arrayUnion({
                projectColor: blockPickerColor,
                projectTitle:  inputRef.current.value,
                tasks: {
                    completedTasks: 0,
                    tasksToBeCompleted: 0,
                    estimatedTime: 0,
                    elaspedTime: 0,
                    //ProjectTasks is an Array that contains all the tasks related to this specific project
                    projectTasks: []
                }
            })
        })
        dispatch(fetchUserSettings(userId))
    }
    const getInputValue =  () =>  {
        // dispatch(createProject({projectName: inputRef.current.value, projectColor: blockPickerColor}))
        addProject()
        inputRef.current.value = ""
        dispatch(deActivateProjectBtn())
       
        createUserCollection("AMadi",{projectName: inputRef.current.value, projectColor: blockPickerColor})
    
    }
    
    return (
        <div className={styles.AddProject}>
            <header className={styles.projectHeader}>
                <Link to= {-1} >
                    <IoIosClose className={styles.cancle}/>
                </Link>
                <h3  className={styles.projectTitle}>{title}</h3>
                <ButtonDone  disable = {!showBtn} active = {showBtn} handleClick={ getInputValue}/>
            </header>
            {/* <ProjectInput projectColor={blockPickerColor}/> */}
            <div className={styles.InputWrapper}>
            <div className={styles.InputContainer}>
                <div style={{backgroundColor: `${blockPickerColor}`}} className={styles.colorDisplay}></div>
                <input 
                className={styles.projectInput} 
                type='text' 
                placeholder= "New project name"
                ref = {inputRef}
                onChange = {(e) => {
                    if(e.target.value){
                        dispatch(activateProjectBtn())
                    }
                    else{
                        dispatch(deActivateProjectBtn())
                    }
                    
                }}
                />
            </div>
            
        </div>
           <CirclePicker 
            color = {blockPickerColor}
            onChange = {(color) => {
            setBlockPickerColor(color.hex)
            console.log(color.hex);
           }}
           width = "100%"
           circleSize= {35}
           circleSpacing ={16}
           style = {{marginLeft: "16px"}}
           />
        </div>
    )
}
export default AddProject