import React, { useContext, } from "react";
import styles from "./FrontPage.module.scss";
import Button, {
  ButtonContinue,
  ButtonPause,
  ButtonStop,
  ButtonStart,
} from "../Button/Button";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import {  useTimer } from "react-timer-hook";
import btnStyles from "../Button/Button.module.scss";
import { Link,  useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {auth} from "../Firebase/Firebase"
import {persistor} from "../Store/Store"
// import ReactAudioPlayer from "react-audio-player";
import UIFx from "uifx";

import CircularTimer from "../CircularTimer/CircularTimer";
import {
  showStartBtn,
  hideStartBtn,
  showPauseBtn,
  hidePauseBtn,
  showStopBtn,
  hideStopBtn,
  showContinueBtn,
  hideContinueBtn,
  resetState,
  breakEnd,
  breakStart,
  endCounting,
  startCounting,
  updateCurrnetTime,
  turnOffCountDownRunning,
  turnOnCountDownRunning
} from "./FrontPageSlice";
import { getUserId } from "../SignUpForms/SignUpFormSlice";
import Toness from "../audioFiles/AudioFiles"
import Bell from "../audioFiles/Bell.mp3"
import Impact  from "../audioFiles/Impact.mp3"
import Buzzer from "../audioFiles/Buzzer.mp3"
import Swoosh from "../audioFiles/Swoosh.mp3"
import Decide from "../audioFiles/Decide.mp3"
import Ding from "../audioFiles/Ding.mp3"
import Notification from "../audioFiles/Notification.mp3"
import Thriller from "../audioFiles/Thriller.mp3"
import TubularBell from "../audioFiles/TubularBell.mp3"
import Announcement from "../audioFiles/Announcement.mp3"
/////////////////////////////////
const FrontPage = ({ expiryTimestamp }) => {
  const dispatch = useDispatch();
  const time = new Date();
  const circularTime = useSelector((state) => state.frontPage.minute5);
  let tone = useSelector((state) => state.tones.workAlarm)
  time.setSeconds(time.getSeconds() + circularTime);
  const running = useSelector((state) => state.frontPage.running);
  const Pause = useSelector((state) => state.frontPage.Pause);
  const Continue = useSelector((state) => state.frontPage.Continue);
  const stop = useSelector((state) => state.frontPage.stop);
  const counting = useSelector((state) => state.frontPage.counting);
  const pomodoroTime = useSelector(state => state.settings.pomodoroCurrLength)
  const countDownRunning = useSelector(state => state.frontPage.countDownRunning)
 ////////////////////////////////////////////////////////////
 switch(tone){
  case "Bell":
    tone = Bell;
    break;
  case "Impact":
    tone = Impact;
    break;
  case "Ding":
    tone = Ding;
    break;
  case "Buzzer":
    tone = Buzzer;
    break;
  case "Decide":
    tone = Decide;
    break;
  case "Notification":
    tone = Notification;
    break;
  case "Swoosh":
  tone = Swoosh;
    break;
  case "Thriller":
    tone = Thriller;
    break;
  case "TubularBell":
    tone = TubularBell;
    break;
  case "Announcement":
    tone = Announcement;
    break;
 }
   console.log(tone);
  const workAlarm = new UIFx(tone, { volume: 0.4, throttleMs: 100 });
  console.log(tone);
  const navigate = useNavigate()
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      onExpiry();
    },
  });
  
  useEffect(() => {
    if(countDownRunning) {
      start()
    }
    else {
      return
    }
  },[countDownRunning])
  
 

  const getDate = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + (60 * pomodoroTime));
    console.log(time);
    return time
   
  };
   useEffect(() => {
    if(!isRunning && !countDownRunning){
      restart(getDate(),false)
    }
  },[countDownRunning,isRunning])
  // console.log(expiryTimestamp);
  const onExpiry = () => {
    workAlarm.play();
    dispatch(resetState());
    restart(getDate(), false);
    dispatch(breakStart());
    dispatch(turnOffCountDownRunning())
  };
  const Style = [styles.FrontPageTime];
  let classes = [classNames(btnStyles.BtnStart)];
  const startCountDown = (e) => {
    restart(getDate(), false);
    start();
    dispatch(hideStartBtn());
    dispatch(startCounting());
    dispatch(turnOnCountDownRunning())
  };
  // dispatch(updateCurrnetTime({ minute }));
  const pauseCountDown = () => {
    pause();
    dispatch(hidePauseBtn());
    dispatch(showContinueBtn());
    dispatch(showStopBtn());
  };
  const countinueCountDown = () => {
    resume();
    dispatch(hideContinueBtn());
    dispatch(hideStopBtn());
    dispatch(showPauseBtn());
  };
  const stopCountDown = () => {
    dispatch(resetState());
    restart(getDate(), false);
    dispatch(showStartBtn());
    dispatch(hideContinueBtn());
    dispatch(hideStopBtn());
    dispatch(turnOffCountDownRunning())
  };
  
  return (
    <div className={styles.FrontPageMainWrapper}>
      <Link to="/UserAccount" className={styles.UserAccountLink}>
        <IoIosArrowDown />
      </Link>
      <div className={styles.FrontPageWrapper}>
        <div className={styles.FrontPageTime}>
          <div className={styles.timer}>
            { minutes} : { seconds }
          </div>
          <div className={styles.BtnWrapper}>
            <button
              className={running ? btnStyles.BtnStart : btnStyles.BtnHide}
              onClick={startCountDown}
            >
              Start Focus
            </button>
            <button
              className={Pause ? btnStyles.BtnPause : btnStyles.BtnHide}
              onClick={pauseCountDown}
            >
              Pause
            </button>
            <div className={btnStyles.BtnWrapper}>
              <button
                className={Continue ? btnStyles.BtnContinue : btnStyles.BtnHide}
                onClick={countinueCountDown}
              >
                Continue
              </button>
              <button
                className={stop ? btnStyles.BtnStop : btnStyles.BtnHide}
                onClick={stopCountDown}
              >
                Stop
              </button>
            </div>
          </div>
          {/* <div>{seconds}</div> */}
        </div>
        {/* <Link /> */}
      </div>
    </div>
  );
};

export default FrontPage;
