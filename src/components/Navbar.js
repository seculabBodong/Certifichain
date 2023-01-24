import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import logoIcon from "../assets/logoIcon.png";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.ineerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

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
          {button && (
            <Button buttonStyle="btn--outline">
              <Link to="/login" style={{ textDecoration: 'none',color: "white"}}>Sign In</Link>
            </Button>
          )}
          {button && (<Button buttonStyle="btn--outline">Sign Up</Button>)}
          {button && (
            <Button buttonStyle="btn--outline">
              <Link to="/input" style={{ textDecoration: 'none',color: "white"}}>Input</Link>
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
