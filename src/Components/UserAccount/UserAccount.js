import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserAccount.module.scss";
import {
  FaChartLine,
  FaSeedling,
  FaUserFriends,
  FaSun,
  FaRegCalendarCheck,
  FaRegCalendarAlt,
  WiSunrise,
} from "react-icons/fa";
import { BiCalendar, BiCheckCircle } from "react-icons/bi";
import { IoIosSettings, IoIosSearch } from "react-icons/io";
import SearchInput from "../SearchInput/SearchInput"
import { MdEventNote, MdOutlineWbTwilight } from "react-icons/md";
import {ButtonBack} from '../NavButtons/NavButton'

const UserAccountUI = (props) => {
  
  return (
    <div className={styles.UserAccountUI}>
      <nav className={styles.Nav}>
        <ul className={styles.listContainer}>
          <li className={styles.listItem}><ButtonBack/></li>
          <li className={styles.listItem}>
            <Link className={styles.link} to="/settings">
              <IoIosSettings className={styles.settingLink} />
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to="/community">
              <FaUserFriends className={styles.icon} />
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to="/Sunlight">
              <FaSeedling className={styles.icon} />
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to="/statistics">
              <FaChartLine className={styles.icon} />
            </Link>
          </li>
        </ul>
      </nav>
      <SearchInput/>
      {/* <input type="search" placeholder="Search" className={styles.search} /> */}
      <div className={styles.todoWrapper}>
        <div className={styles.todo}>
          <Link className={styles.link} to="/todayTodo">
            <FaSun className={styles.sunIcon} />
          </Link>
          <span className={styles.todayTodo}>Today</span>
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/tomorrowTodo">
            <MdOutlineWbTwilight className={styles.tomorrowIcon} />
          </Link>
          <span className={styles.todayTodo}>Tomorrow</span>
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/upcomingTodo">
            <FaRegCalendarCheck className={styles.upcomingIcon} />
          </Link>
          <span className={styles.todayTodo}>Upcoming</span>
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/somedayTodo">
            <FaRegCalendarAlt className={styles.somedayIcon} />
          </Link>
          <span className={styles.todayTodo}>Someday</span>
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/events">
            <MdEventNote className={styles.eventIcon} />
          </Link>
          <span className={styles.todayTodo}>Events</span>
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/completed">
            <BiCheckCircle className={styles.completedIcon} />
          </Link>
          <span className={styles.todayTodo}>Completed</span>
        </div>
      </div>
    </div>
  );
};
export default UserAccountUI;
