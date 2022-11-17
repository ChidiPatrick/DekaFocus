import React, {useState,useRef} from "react"
import style from "./addTaskInput.module.scss"
import { useSearchParams } from "react-router-dom"

// import { useState } from "react"

const AddTaskInput = (props) => {
    // const 
    const [focused, setFocus] = useState(false)
    const inputRef = useRef()
    console.log(inputRef.current)
    const someAction = () => {
    inputRef.current.focus()
    console.log( inputRef.current);
    // inputRef.current.blur()
}
    return (
        <input type = "text" placeholder="+ Add a task..." 
        className={ style.addTaskInputNotFocused }
        ref={inputRef}
       onClick={someAction}
        />
    )
}
export default AddTaskInput