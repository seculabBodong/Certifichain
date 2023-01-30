import { NavLink } from "react-router-dom";
import Navbar from "../../components/Signup.css";
import logo from "../../assets/logoIcon.png"

export function Signup() {
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
                <text>Silahkan Mendaftar</text>
              </div>
              <div className="secondary">
                <text>
                    Hmm mari daftarkan organisasimu sekarang, gaskan!
                </text>
              </div>
            </div>
          </div>
        </div>

        <div className="appForm">
          <div className="formContainer">
            <div className="formTitle"> 
              <text className="titleLogin">
                Sign Up
              </text>
            </div>
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                this.signIn();
              }}>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter organization name"
                  name="email"
                  required />
              </div>

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

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Re-type Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password"
                />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Supporting File
                </label>
                <div className="input-logo-container">
                    <label for="upload-logo">Pilih File</label>
                    <input type="file" name="photo" id="upload-logo" />
                </div>
              </div>

              
              <div className="formFieldButtoms">
                <button className="formFieldButton">Submit</button>{" "}
              </div>
            </form>
          </div>
          
        </div>
      {/* </div> */}
    </div>
  );
}
