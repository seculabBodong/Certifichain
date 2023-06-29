import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset, LoginBlockchain } from "../../features/authSlice";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Login.css";
import logo from "../../assets/logoIcon.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgname, setOrgname] = useState("Org2");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, blockchainUser, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess || blockchainUser) {
      console.log(user);
      console.log(isSuccess);
      document.cookie = `myCookie=${blockchainUser.token}`;
      // console.log(document.cookie);
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate, blockchainUser]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginBlockchain({ email, orgname }));
    dispatch(LoginUser({ email, password }));
    // console.log(blockchainUser);
  };

  return (
    <div className="App">
      {/* <div className="mainContainer1"> */}
      <div className="appAside">
        <div className="logoContainer"></div>
        <div className="mainContainer">
          <div className="textContainer">
            <div className="side-title">
              <text className="readex-pro" style={{ color: "white" }}>
                Selamat datang kembali!
              </text>
            </div>
            <div className="secondary">
              <text>
                Silahkan login untuk dapat menggunakan fitur lengkap, yahaayuuk!
              </text>
            </div>
          </div>
        </div>
      </div>

      <div className="appForm">
        <div className="formContainer">
          <div className="formTitle">
            <text className="titleLogin readex-pro">Login</text>
          </div>
          <form className="form" onSubmit={Auth}>
            <div className="formField">
              {isError && <div>{message}</div>}
              <label className="formFieldLabel readex-pro" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel readex-pro" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="formFieldButtoms">
              <button type="submit" className="formFieldButton">
                {isLoading ? "Loading..." : "Login"}
              </button>{" "}
              <NavLink className="formFieldLink">Lupa password</NavLink>
            </div>
          </form>

          <div className="formField">
            <span className="infoText">
              Belum memliki akun?
              <NavLink className="signUp" to="/signup"> signup </NavLink>
            </span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
