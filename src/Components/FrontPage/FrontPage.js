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
import classNames from "classnames";
import { FALSE } from "sass";

const FrontPage = ({ expiryTimestamp }) => {
  const [running, setRunning] = useState(true);
  const [paused, setPaused] = useState(true);
  const [Continue, setContinue] = useState(false);
  const [stop, setStop] = useState(false);

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
      setRunning(true);
      setPaused(true);
      setStop(false);
      setContinue(false);
    },
  });
  const Style = [styles.FrontPageTime];
  let classes = [classNames(btnStyles.BtnStart)];
  const startCountDown = (e) => {
    start();
    setRunning(false);
    // setPaused(true);
  };

  // if (isRunning) {
  //   setRunning(true);
  // }
  const pauseCountDown = () => {
    pause();
    setContinue(true);
    setStop(true);
    setPaused(false);
  };
  const countinueCountDown = () => {
    resume();
    setPaused(true);
    setContinue(false);
    setStop(false);
  };
  const stopCountDown = () => {
    restart();
    setRunning(true);
    setContinue(false);
    setStop(false);
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
            className={paused ? btnStyles.BtnPause : btnStyles.BtnHide}
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
    </div>
  );
};
export default FrontPage;
