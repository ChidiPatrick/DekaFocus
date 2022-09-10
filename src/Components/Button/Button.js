import React from "react";
import styles from "./Button.module.scss";
const button = (props) => {
  const { children } = props;
  return (
    <button className={styles.BtnPause} onClick={props.countDown}>
      {children}
    </button>
  );
};
export default button;
