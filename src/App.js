import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AI from "./components/AI";
import ModelView from "./components/ModelView";
import ARVR from "./components/ARVR";
import Quize from "./components/Quize";
import Login from "./Login";

// 1. Create a wrapper component to check the current URL path
function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* 2. Condition: Only show Navbar if the path is NOT '/login' */}
      {location.pathname !== "/login" && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/model" element={<ModelView />} />
        <Route path="/arvr" element={<ARVR />} />
        <Route path="/quize" element={<Quize />} />
      </Routes>
    </>
  );
}

// 3. Keep the Router at the top level
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;