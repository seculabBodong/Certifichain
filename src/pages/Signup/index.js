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
  const [docFile, setDocFile] = useState();
  const navigate = useNavigate();

  const fileSelect = (event) => {
    setDocFile(event.target.files[0]);
    console.log(docFile);
  }

  const saveUserBlockchain = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://hyperledger.seculab.space/register",
        {
          username: email,
          orgName: "Org2"
        }
      );
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const saveUser = async (e) => {
    const formDaftar = new FormData();
    formDaftar.append("name", name);
    formDaftar.append("email", email);
    formDaftar.append("password", password);
    formDaftar.append("confPassword", confPassword);
    formDaftar.append("role", "client");
    formDaftar.append("file", docFile);
    e.preventDefault();
    try {
      await axios.post(
        "https://hyperledger.seculab.space/register",
        {
          username: email,
          orgName: "Org2"
        }
      );
      await axios.post(
        "https://backend.seculab.space/users", formDaftar,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
      // await saveUserBlockchain();
      // await saveUser();
      console.log("berhasil upload");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log("gagall");
      }
    }
  };

  const uploadPdf = async (e) => {
    const formData = new FormData();
    formData.append("selectedFile", docFile);
    e.preventDefault();
    try {
      await axios.post(
        "https://backend.seculab.space/", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const checkForm = () => {
    const formDaftar = new FormData();
    formDaftar.append("name", name);
    formDaftar.append("email", email);
    formDaftar.append("password", password);
    formDaftar.append("confPassword", confPassword);
    formDaftar.append("role", "client");
    formDaftar.append("file", docFile);
    for (const value of formDaftar.values()) {
      console.log(value);
    }
  }

  return (
    <div className="App">
      {/* <div className="mainContainer1"> */}
      <div className="appAside">
        <div className="logoContainer">
          <NavLink className="logo">
            {/* <img src={logo} className="logoImage" /> */}
            {/* <div className="logoText">CERTIFICHAIN</div> */}
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
          <form className="form" onSubmit={saveUser}>
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
                className="formFieldInput"
                placeholder="Enter your password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>

            <div className="input-logo-container">
                {/* <label for="upload-logo">Pilih File</label> */}
                <label className="formFieldLabel" htmlFor="password">
                Input Bukti
              </label>
                <input type="file" name="photo" id="upload-logo" className="input-bukti" onChange={fileSelect}/>
                {/* <div className="formFieldButton" onClick={checkForm}>
                  Submit File
                </div> */}
            </div>

            <div className="formFieldButtoms">
              <button type="submit" className="formFieldButton">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
