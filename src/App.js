import logo from "./logo.svg";
import "./App.scss";
import FrontPage from "./Components/FrontPage/FrontPage";
import { Routes, Route, Link } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </div>
  );
}

export default App;
