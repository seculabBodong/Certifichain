import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import logoIcon from "../assets/logoIcon2.png";
import ProfileIcon from "../assets/defaultPP.png"
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../src/features/authSlice";
import styled from "@emotion/styled";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  }

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const goProfile = () => {
    navigate("/profile");
  }

  const goLogin = () => {
    navigate("/login");
  }

  const goSignup = () => {
    navigate("/signup");
  }

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logoIcon} className="navbar-img" />
          <Link to="/" className="navbar-logo">
            Certifichain
          </Link>
          <div className="menu-icon">
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                FAQ
              </Link>
            </li>
          </ul>
          <div className="vertical"></div>
          {!user && (
            <Button onClick={() => goLogin} variant="outlined" style={{marginRight: 30, borderColor: "white"}}>
              <Link to="/login" style={{ textDecoration: 'none',color: "white"}}>Sign In</Link>
            </Button>
          )}
          {!user && (
            <Button variant="outlined" style={{marginRight: 30, borderColor: "white"}}>
              <Link to="/signup" style={{ textDecoration: 'none',color: "white"}}>Sign Up</Link>
            </Button>
          )}
          {user && (
            <Button variant="outlined" style={{marginRight: 30, borderColor: "white"}}>
              <Link to="/input" style={{ textDecoration: 'none',color: "white"}}>Input</Link>
            </Button>
          )}
          {user && (
            <Button variant="outlined" onClick={logout} style={{marginRight: 30, borderColor: "white"}}>
              <Link to="/login" style={{ textDecoration: 'none',color: "white"}}>Logout</Link>
            </Button>
          )}
          {user && (
            <>
              <div className="nama-user">{user && user.name}</div>
              <img src={ProfileIcon} onClick={goProfile} className="profile-icon" />
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
