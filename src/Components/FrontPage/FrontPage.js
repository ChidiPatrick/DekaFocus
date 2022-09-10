import React from "react";
import styles from "./FrontPage.module.scss";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
const FrontPage = (props) => {
  let [MINUTES, setMINUTES] = useState(4);
  let [SECONDS, setSECONDS] = useState(2);

  const countDown = () => {
    let minute = MINUTES;
    let seconds = SECONDS;
    setInterval(() => {
      seconds--;
      setSECONDS(seconds);
      console.log(seconds);
      if (MINUTES === 0) {
        clearTimeout();
        return;
      }
      if (seconds === 0) {
        minute--;
        setMINUTES(minute);
        seconds = SECONDS;
      }
    }, 1000);
  };

  return (
    <div className={styles.FrontPageWrapper}>
      <div className={styles.FrontPageTime}>
        <span className={styles.timer}>
          {MINUTES}:{SECONDS}
        </span>
        {/* {minuteDiv.map((div, i) => {
          return <div key={i}> {i}</div>;
        })} */}
        <Button countDown={() => countDown()}>Start Focus</Button>
      </div>
    </div>
  );
};
export default FrontPage;
