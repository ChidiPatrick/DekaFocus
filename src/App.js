import logo from "./logo.svg";
import "./App.scss";
import FrontPage from "./Components/FrontPage/FrontPage";
import { Routes, Route, Link } from "react-router";
import { useSelector } from "react-redux";

function App() {
  const time = new Date();
  const minute = useSelector((state) => state.frontPage.minute5);

  time.setSeconds(time.getSeconds() + minute);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontPage expiryTimestamp={time} />} />
      </Routes>
    </div>
  );
}

export default App;
