import logo from "./logo.svg";
import "./App.scss";
import FrontPage from "./Components/FrontPage/FrontPage";
import { Routes, Route, Link } from "react-router";
import { useSelector } from "react-redux";
import BreakUI from "./Components/BreakUI/BreakUI";

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
      </Routes>
    </div>
  );
}

export default App;
