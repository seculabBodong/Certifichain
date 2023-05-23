import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Input } from "./pages/Input";
import { Verify } from "./pages/Verify";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Event } from "./pages/Event";
import { Edit_sertifikat } from "./pages/Create";
import Qrcode from "./pages/Create/next_hmm";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/event" element={<Event />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/input" element={<Input />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/edit_sertifikat" element={<Edit_sertifikat />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
