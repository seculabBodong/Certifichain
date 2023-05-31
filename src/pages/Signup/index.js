import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/Signup.css";
import logo from "../../assets/logoIcon.png";
import defaultProfile from "../../assets/orgPP.png";
import React, { useState } from "react";
import axios from "axios";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const saveUserBlockchain = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/register",
        {
          username: email,
          orgName: "Org2",
        }
        // , {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/users",
        {
          name: name,
          email: email,
          password: password,
          confPassword: confPassword,
          role: "client",
          // imageFile: defaultProfile,
        }
        // , {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveUserBlockchain();
      await saveUser();
      console.log("berhasil upload");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log("gagall");
      }
    }
  };

  return (
    <div className="App">
      {/* <div className="mainContainer1"> */}
      <div className="appAside">
        <div className="logoContainer">
          <NavLink className="logo">
            <img src={logo} className="logoImage" />
            <div className="logoText">CERTIFICHAIN</div>
          </NavLink>
        </div>
        <div className="mainContainer">
          <div className="textContainer">
            <div className="side-title">
              <text>Silahkan Mendaftar</text>
            </div>
            <div className="secondary">
              <text>Hmm mari daftarkan organisasimu sekarang, gaskan!</text>
            </div>
          </div>
        </div>
      </div>

      <div className="appFormSignup">
        <div className="formContainer">
          <div className="formTitle">
            <text className="titleLogin">Sign Up</text>
          </div>
          <form
            className="form"
            onSubmit={() => {
              handleSubmit();
            }}
          >
            <p>{msg}</p>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Organization Name
              </label>
              <input
                type="text"
                className="formFieldInput"
                placeholder="Enter organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>

            {/* <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Supporting File
              </label>
              <div className="input-logo-container">
                <label for="upload-logo">Pilih File</label>
                <input type="file" name="photo" id="upload-logo" />
              </div>
            </div> */}

            <div className="formFieldButtoms">
              <button type="submit" className="formFieldButton">
                Submit
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
