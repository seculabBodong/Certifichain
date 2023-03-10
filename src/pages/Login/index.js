import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Login.css";
import logo from "../../assets/logoIcon.png"

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if(user || isSuccess){
      navigate("/")
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate])
  
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({email, password}));
  }

  return (
    <div className="App">
      {/* <div className="mainContainer1"> */}
        <div className="appAside">
          <div className="logoContainer">
            <NavLink className="logo">
              <img src={logo} className="logoImage"/>
              <div className="logoText">CERTIFICHAIN</div>
            </NavLink>
          </div>
          <div className="mainContainer">
            <div className="textContainer">
              <div className="side-title">
                <text>Selamat datang kembali!</text>
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
              <text className="titleLogin">
                Login
              </text>
            </div>
            <form className="form" onSubmit={Auth}>
              <div className="formField">
                {isError && <div>{message}</div>}
                <label className="formFieldLabel" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required />

              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>

              <div className="formFieldButtoms">
                <button type="submit" className="formFieldButton">{isLoading ? 'Loading...' : "Login"}</button>{" "}
                <NavLink className="formFieldLink">
                  Lupa password
                </NavLink>
              </div>
            </form>
            
              <div className="formField">
                <span className="infoText">Belum memliki akun? 
                  <NavLink className="signUp"> signup </NavLink>
                </span>
              </div>
          </div>
          
        </div>
      {/* </div> */}
    </div>
  );
}
