import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        {isLoggedIn && <Route path="/admin" element={<AdminPanel />} />}
      </Routes>
    </Router>
  );
}

export default App;
