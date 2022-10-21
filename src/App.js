import logo from "./logo.svg";
import "./App.scss";
import FrontPage from "./Components/FrontPage/FrontPage";
import { Routes, Route, Link } from "react-router";
import { useSelector } from "react-redux";
import BreakUI from "./Components/BreakUI/BreakUI";
import UserAccountUI from "./Components/UserAccount/UserAccount";
import AddTask from "./Components/addTask/addTask";
import Setting from "./Components/Settings/Settings"
import Settings from "./Components/Settings/Settings";
function App() {
  const time = new Date();
  const minute = useSelector((state) => state.frontPage.minute5);
  time.setSeconds(time.getSeconds() + minute);
  const displayBreak = useSelector((state) => state.frontPage.break);
  console.log(displayBreak);
  let frontpage = null;
  if (displayBreak) {
    frontpage = <BreakUI expiryTimestamp={time} />;
  } else {
    frontpage = <FrontPage expiryTimestamp={time} />;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={frontpage} />
        <Route path="/UserAccount" element={<UserAccountUI />} />
        <Route path="//todayTodo" element={<AddTask />} />
        <Route path="/tomorrowTodo" element={<AddTask />} />
        <Route path="/upcomingTodo" element={<AddTask />} />
        <Route path="/somedayTodo" element={<AddTask />} />
        <Route path="/events" element={<AddTask />} />
        <Route path="/completed" element={<AddTask />} />
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </div>
  );
}

export default App;
