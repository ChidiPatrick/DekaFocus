import logo from "./logo.svg";
import "./App.scss";
import FrontPage from "./Components/FrontPage/FrontPage";
import { Routes, Route, Link } from "react-router";

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontPage expiryTimestamp={time} />} />
      </Routes>
    </div>
  );
}

export default App;
