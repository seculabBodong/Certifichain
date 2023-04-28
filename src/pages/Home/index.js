import "../../components/Home.css";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import award from "../../assets/award1.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import addCert from "../../assets/addcert.png"

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      {!user && (
        <div className="container">
          {/* <img src={award} style={{width : 200, position: "absolute"}}/> */}
          <div className="content">
            <div className="text-title">SELAMAT DATANG!</div>
              <div className="content-middle">
                <div>
                  <div className="text-content">
                    Certifichain adalah web yang membantu anda verifikasi sertifikat dengan
                    mudah
                  </div>
                  <div className="get-started">
                    <Link to='/verify' style={{ textDecoration: 'none', color: "black"}}>Get Started</Link>
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-container2">
                    <text>Scan Sertifikatmu</text>
                    <text>atau</text>
                    <div className="pilih-file">
                      <label for="upload-file">Pilih File</label>
                      <input type="file" name="photo" id="upload-file" />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
      {user && (
        <div className="dashboard-container">
          <div className="dashboard-content">
              <div style={{ fontSize: 32, fontWeight: "bold"}} className="dashboard-user readex-pro">HI, {user.name}</div>
              <div className="dashboard-optionbox">
                <img src={addCert} className="dashboard-optionbox-icon"/>
                <Link to="/input" style={{ textDecoration: 'none', color: "white"}}>Input</Link>
                <div style={{ fontSize: 26}} className="readex-pro">Create</div>
              </div>
              <div className="dashboard-certlist">
                <div style={{ fontSize: 32, fontWeight: "bold"}} className="readex-pro">Certificate</div>
                <div style={{ margin: "1%"}}> 
                  <table>
                    <tr>
                      <th>Event</th>
                      <th>Organization</th>
                      <th>Created Date</th>
                      <th>Last Modified</th>
                      <th>More</th>
                    </tr>
                    <tr>
                      <td>Study Grup 2023</td>
                      <td>{user.name}</td>
                      <td>10 Feb 2023</td>
                      <td>16 Mar 2023</td>
                      <td>{'>'}</td>
                    </tr>
                    <tr>
                    <td>Study Grup 2023</td>
                      <td>{user.name}</td>
                      <td>10 Feb 2023</td>
                      <td>16 Mar 2023</td>
                      <td>{'>'}</td>
                    </tr>
                    <tr>
                    <td>Study Grup 2023</td>
                      <td>{user.name}</td>
                      <td>10 Feb 2023</td>
                      <td>16 Mar 2023</td>
                      <td>{'>'}</td>
                    </tr>
                  </table>
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
}
