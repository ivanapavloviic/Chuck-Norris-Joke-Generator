import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import FactPage from "./FactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search/:query" element={<FactPage />} />
        <Route path="/fact/:id" element={<FactPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
