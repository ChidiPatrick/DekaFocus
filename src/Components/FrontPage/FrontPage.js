import React from "react";
import styles from "./FrontPage.module.scss";
import Button, {
  ButtonContinue,
  ButtonPause,
  ButtonStop,
  ButtonStart,
} from "../Button/Button";
import { useState, useEffect, useRef } from "react";
import { userTimer, useTimer } from "react-timer-hook";
import btnStyles from "../Button/Button.module.scss";
import { Link } from "react-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
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
} from "./FrontPageSlice";

/////////////////////////////////
const FrontPage = ({ expiryTimestamp }) => {
  const running = useSelector((state) => state.frontPage.running);
  const Pause = useSelector((state) => state.frontPage.Pause);
  const Continue = useSelector((state) => state.frontPage.Continue);
  const stop = useSelector((state) => state.frontPage.stop);
  console.log(Pause);
  // const [running, setRunning] = useState(true);
  // const [paused, setPaused] = useState(true);
  // const [Continue, setContinue] = useState(false);
  // const [stop, setStop] = useState(false);

  let minute = useSelector((state) => state.frontPage.minute5);
  const dispatch = useDispatch();
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

  const getDate = () => {
    const time = new Date();
    return time.setSeconds(time.getSeconds() + 5);
  };
  console.log(expiryTimestamp);
  const onExpiry = () => {
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
  };

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

  return (
    <div className={styles.FrontPageWrapper}>
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
      </div>
      {/* <Link /> */}
    </div>
  );
};

export default FrontPage;
