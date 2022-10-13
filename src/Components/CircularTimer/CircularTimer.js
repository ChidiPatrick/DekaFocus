import { useDispatch, useSelector } from "react-redux";
import styles from "./CircularTimer.module.scss";
import { userTimer, useTimer } from "react-timer-hook";
const CircularTimer = ({ expiryTimestamp }) => {
  const running = useSelector((state) => state.frontPage.running);
  const Pause = useSelector((state) => state.frontPage.Pause);
  const Continue = useSelector((state) => state.frontPage.Continue);
  const stop = useSelector((state) => state.frontPage.stop);
  const counting = useSelector((state) => state.frontPage.counting);
  console.log(counting);
  //   const bell = new UIFx(bellSound, { volume: 0.4, throttleMs: 100 });

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
  const onExpiry = () => {};

  return (
    <div className={styles.CircularTimer}>
      <div className={styles.timer}>{seconds}</div>
    </div>
  );
};
export default CircularTimer;
