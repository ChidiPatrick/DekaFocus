import React from "react";
import style from "./addTask.module.scss";
import { useNavigate } from "react-router";
import {ButtonBack} from "../NavButtons/NavButton";
import { TbArrowsDownUp } from "react-icons/tb";
import AddTaskInput from "../addTaskInput/addTaskInput"
const AddTask = () => {
  const navigate = useNavigate();
  const moveToPreviousePage = () => {
    navigate(-1);
  };
  return (
    <div className={style.TaskWrapper}>
      <div className={style.TaskHeaderWrapper}>
        <ButtonBack/>
        {/* <button className={style.backBtn} onClick={moveToPreviousePage}>
          <HiChevronLeft className={style.navigateBackIcon} />
        </button> */}
        <h2 className={style.TaskHeader}>Tomorrow</h2>
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
          <div className={style.TaskEstimatedTime}>00:00</div>
          <span className={style.TaskTimeUnit}>Estimated Time</span>
        </div>
        <div className={style.TaskTobeCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskTobeCompleted}>0</div>
          <span className={style.TaskTimeUnit}>Tasks todo</span>
        </div>
        <div className={style.ElapsedTimeWrapper}>
          <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>HH</span>
            <span className={style.TaskTimeUnit}>MM</span>
          </div>
          <div className={style.TaskEstimatedTime}>14:10</div>
          <span className={style.TaskTimeUnit}>Elasped Time</span>
        </div>
        <div className={style.TaskCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskEstimatedTime}>0</div>
          <span className={style.TaskTimeUnit}>Completed Tasks</span>
        </div>
      </div>
    
      <AddTaskInput/>
    </div>
  );
};

export default AddTask;
