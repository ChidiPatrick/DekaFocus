import React from "react";
import styles from "./CompletedTask.module.scss"
import { BiCalendar, BiCheckCircle } from "react-icons/bi";
import { FaStopwatch,FaAngleRight,FaCaretRight} from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
////////////////////////////////////////////////
const CompletedTasks = ({projectCurrTask, showFinishedTasks}) => {
    console.log(projectCurrTask);
    return(
        <div className={showFinishedTasks ? styles.finishedTaskComponent : styles.hideTasks}>
            {projectCurrTask.map((task,index) => {
              return <div className={styles.finishedTasksWrapper} key = {index}>
                    <div className={styles.taskDate}>Date</div>
                    <div className={styles.finishedTaskContainer}>
                        <div className={styles.finishedTaskIconContainer}>
                            <IoIosCheckmark className={styles.finishedTaskIcon}/>
                        </div>
                        <div className={styles.finishedTaskInnerWrapper}>
                            <div className={styles.finishedTask}>Finished task</div>
                            <div className={styles.pomodoroIcon}>
                                <FaStopwatch className={styles.stopwatch}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            })}
        </div>
    )
}
export default CompletedTasks