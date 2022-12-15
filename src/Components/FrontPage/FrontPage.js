import React, { useContext } from "react";
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
import { Link } from "react-router-dom";
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
} from "./FrontPageSlice";
import { getUserId } from "../SignUpForms/SignUpFormSlice";
import Toness from "../audioFiles/AudioFiles";

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
  const bell = new UIFx(Toness.Bell, { volume: 0.4, throttleMs: 100 });
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
  console.log(expiryTimestamp);
  useEffect(() => {
    console.log(running);
  },[])
  // dispatch(getUserId(user.uid))
console.log(Toness);
  let minute = useSelector((state) => state.settings.pomodoroCurrLength);
  

  const getDate = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + (60 * pomodoroTime));
    console.log(time);
    return time
    // return expiryTimestamp
  };
  // getDate()
  console.log(expiryTimestamp);
  const onExpiry = () => {
    bell.play();
    dispatch(resetState());
    restart(getDate(), false);
    dispatch(breakStart());
  };
  const Style = [styles.FrontPageTime];
  let classes = [classNames(btnStyles.BtnStart)];
  const startCountDown = (e) => {
    restart(getDate(), false);
    start();
    dispatch(hideStartBtn());
    dispatch(startCounting());
  };
  dispatch(updateCurrnetTime({ minute }));
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
  };
  console.log(isRunning);
  useEffect(() => {
    // start()
},[])
  return (
    <div className={styles.FrontPageMainWrapper}>
      <Link to="/UserAccount" className={styles.UserAccountLink}>
        <IoIosArrowDown />
      </Link>
      <div className={styles.FrontPageWrapper}>
        {/* <Link to="/UserAccount">
          <IoIosArrowDown />
        </Link> */}
        <div className={styles.FrontPageTime}>
          <div className={styles.timer}>
            {minutes} : {seconds}
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
