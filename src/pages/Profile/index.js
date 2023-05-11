import "../../components/Profile.css";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import award from "../../assets/award1.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import orgPP from "../../assets/orgPP.png"
import axios from "axios";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  const {user} = useSelector((state) => state.auth);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0], e.target.files[0].name)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    for (const [key, value] of formData) {
      console.log(`${key}: ${value}\n`); 
    }
  }

  // const savePicture = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:5000/users", {
  //       name: name
  //     });
  //     // navigate("/login");
  //   } catch (error) {
  //     if(error.response){
  //       setMsg(error.response.data.msg)
  //     }
  //   }
  // };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <div className="container-profile">
        <div className="content-profile">
          <div className="content-middle-profile">
            <div className="profile-content">
              <img src={orgPP} className={"profile-image"}/>
              <div className="input-logo-container-profile">
                <label for="upload-logo">Pilih File</label>
                <input type="file" name="file" id="upload-logo" onChange={saveFile}/>
              </div>
            </div>
            <div>
              <div className="title-profile readex-pro">Profile Settings</div>
              <form className="form readex-pro" onSubmit={""}>
                {/* <p>{msg}</p> */}
                <div className="formField">
                  <label className="formFieldLabel" htmlFor="email">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    className="formFieldInput"
                    placeholder="Enter organization name"
                    value={user.name}
                    // onChange={(e)=>setName(e.target.value)}
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
                    value={user.email}
                    // onChange={(e)=>setEmail(e.target.value)}
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
                    // value={password}
                    // onChange={(e)=>setPassword(e.target.value)}
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
                    // value={confPassword}
                    // onChange={(e)=>setConfPassword(e.target.value)}
                  />
                </div>
                <div className="input-logo-container">
                  <label for="upload-logo">Save Changes</label>
                  <input type="file" name="photo" id="upload-logo" />
                </div>

              </form>
            </div>
            </div>
        </div>
      </div>
    </>
  );
}
