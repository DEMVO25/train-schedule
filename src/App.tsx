import { useEffect, useState } from "react";
import "./App.css";

import Login from "./Login";
import Menu from "./Menu";
import TrainSchedule from "./TrainSchedule";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <Login username={username} setUsername={setUsername}>
        <Routes>
          <Route path="/" element={<Menu username={username} />} />
          <Route path="/schedule" element={<TrainSchedule />} />
        </Routes>
      </Login>
    </BrowserRouter>
  );
}

export default App;
