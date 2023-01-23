import { NavLink } from "react-router-dom";
import Navbar from "../../components/Login.css";
import logo from "../../assets/logoIcon.png"
export function Login() {
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
              <div className="title">
                <text>Selamat datang kembali</text>
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
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                this.signIn();
              }}>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
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
                />
              </div>

              <div className="formFieldButtoms">
                <button className="formFieldButton">Login</button>{" "}
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
