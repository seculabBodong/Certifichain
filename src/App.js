import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Input } from "./pages/Input";
import { Verify } from "./pages/Verify";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/input" element={<Input />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
