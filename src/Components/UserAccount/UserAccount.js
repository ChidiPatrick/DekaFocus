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
import AddProject from "../AddProject/AddProject";
import { useDispatch,useSelector } from "react-redux";
import { IoIosAdd,IoIosPricetag,IoIosClose } from "react-icons/io";
import { ImFolderPlus } from "react-icons/im";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Firebase/Firebase"

const UserAccountUI = (props) => {
  const [user,loadingUser,loginError] = useAuthState(auth);
  const projects = useSelector((state) => state.settings.projects)
  const userId = useSelector(state => state.signUpSlice.userId)
  // const projects = [...Array(8)]
  console.log(projects);
  return (
    <div className={styles.UserAccountUI}>
      <nav className={styles.Nav}>
        <ul className={styles.listContainer}>
          <li className={styles.listItem}><ButtonBack/></li>
          <li className={styles.listItem}>
            <Link className={styles.link} to = {user && user.uid ? "/settings" : "/signInForm" } >
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
            <span className={styles.todayTodo}>Today</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/tomorrowTodo">
            <MdOutlineWbTwilight className={styles.tomorrowIcon} />
            <span className={styles.todayTodo}>Tomorrow</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/upcomingTodo">
            <FaRegCalendarCheck className={styles.upcomingIcon} />
            <span className={styles.todayTodo}>Upcoming</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/somedayTodo">
            <FaRegCalendarAlt className={styles.somedayIcon} />
            <span className={styles.todayTodo}>Someday</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/events">
            <MdEventNote className={styles.eventIcon} />
             <span className={styles.todayTodo}>Events</span>
          </Link>
         
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/completed">
            <BiCheckCircle className={styles.completedIcon} />
            <span className={styles.todayTodo}>Completed</span>
          </Link>
          
        </div>
        <div className={styles.projects}>
          {

          projects && projects.map((project,i) => {
           return <Link to = "/AddProject" className={styles.project}>
              <div className={styles.projectWrapper}>
                <div className={styles.colorAndProjectWrapper}>
                  <span style={{backgroundColor: `${project.projectColor}`}} className={styles.projectColor}></span>
                  <p className={styles.projectName}>{project.projectName}</p>
                </div>
                  <div>
                    <span className={styles.focusTime}>45m</span>
                    <span className={styles.numberOfTask}>3</span>
                  </div>
              </div>
            </Link>
          })}
        </div>
        <div className={styles.addProjectWrapper}>
          <Link className={styles.linkToAddProject} to="/AddProject">
             <div className={styles.AddProject}>
              <div className={styles.innerWrapper}>
                <IoIosAdd className={styles.addProjectIcon} />
              <span>Add Project</span>
              </div>
              <div>
              <IoIosPricetag className={styles.addFolderIcon}/>
              <ImFolderPlus className={styles.addTagIcon}/>
              </div>
              </div>
          </Link>
        </div>
          
      </div>
      
    </div>
  );
};
export default UserAccountUI;
