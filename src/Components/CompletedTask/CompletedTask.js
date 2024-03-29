import React from "react";
import styles from "./CompletedTask.module.scss"
import { BiCalendar, BiCheckCircle } from "react-icons/bi";
import { FaStopwatch,FaAngleRight,FaCaretRight} from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { format,formatDistance, subDays } from "date-fns";
////////////////////////////////////////////////
const CompletedTasks = ({completedTasksArray, showFinishedTasks}) => {
    // const completedTasksArray = useSelector(state => state.settings.completedTasksArray)
    return(
        
        completedTasksArray.length > 0 ?
        <div className={showFinishedTasks ? styles.finishedTaskComponent : styles.hideTasks}>
            {completedTasksArray.map((task,index) => {
                const date = new Date(task.date)
              return <div className={styles.finishedTasksWrapper} key = {index}>
                    <div className={styles.taskDate}>{date.toDateString()}</div>
                    <div className={styles.finishedTaskContainer}>
                        <div className={styles.finishedTaskIconContainer}>
                            <IoIosCheckmark className={styles.finishedTaskIcon}/>
                        </div>
                        <div className={styles.finishedTaskInnerWrapper}>
                            <div className={styles.finishedTask}>{task.taskTitle}</div>
                            <div className={styles.pomodoroIcon}>
                                <FaStopwatch className={styles.stopwatch}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            })}
        </div>
        : null
    )
}
export default CompletedTasks