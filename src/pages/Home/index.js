import "../../components/Home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import award from "../../assets/award1.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import addCert from "../../assets/addcert.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { store } from "../../app/store";
import { LoginBlockchain } from "../../features/authSlice";
import iconpdf from "../../assets/file-download.png";
import iconcheck from "../../assets/icon_checkmark.png";
import iconcross from "../../assets/close-circle.png";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [aset, setAset] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userApprove, setUserApprove] = useState([]);
  const [userNotApprove, setUserNotApprove] = useState([]);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("");
  const [orgname, setOrgname] = useState("Org1");
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { blockchainUser } = useSelector((state) => state.auth);
  const currentState = store.getState();

  useEffect(() => {
    dispatch(getMe());
    getAsset();
  }, [dispatch]);

  useEffect(() => {
    // console.log(user.role);
    if (user) {
      setRole(user.role);
    }
    getUser();
  }, [user, userList]);

  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }

  const getAsset = async () => {
    console.log("ALHAMDULILAH");
    try {
      const response = await axios.get(
        `http://localhost:4000/home?args=["Organisasi_Pertahanan"]&peer=peer0.org1.example.com&fcn=AssetByOrganisasi`,
        {
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${getCookie("myCookie")}`,
          },
        }
      );
      // console.log(response.data);
      setAset(response.data);
      // console.log(aset);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("GAGAL");
        return message;
      }
    }
  };

  const getUser = async () => {
    console.log("MANTAP");
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      // console.log(response.data);
      setUserList(response.data);
      const filterApprove = userList.filter(
        (resp) => resp.status == "approved"
      );
      setUserApprove(filterApprove);
      const filterNotApprove = userList.filter(
        (resp) => resp.status == "not_approved"
      );
      setUserNotApprove(filterNotApprove);
      // console.log(aset);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("OH NO");
        return message;
      }
    }
  };
  // console.log(currentState);
  console.log(userApprove);
  console.log(userNotApprove);

  return (
    <>
      {!user && (
        <div className="container">
          {/* <img src={award} style={{width : 200, position: "absolute"}}/> */}
          <div className="content">
            <div className="text-title">SELAMAT DATANG!</div>
            <div className="text-content">
              Certifichain adalah web yang membantu anda verifikasi sertifikat
              dengan mudah
            </div>
            {/* <div className="get-started">
                  <Link
                    to="/verify"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Get Started
                  </Link>
                </div> */}
            <div className="input-container-home">
              <div className="input-container2">
                <text>Scan Sertifikatmu</text>
                <text>atau</text>
                <div className="pilih-file-home">
                  <label for="upload-file">Pilih File</label>
                  <input type="file" name="photo" id="upload-file" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {role == "client" && (
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div
              style={{ fontSize: 32, fontWeight: "bold" }}
              className="dashboard-user readex-pro"
            >
              HI, {user.name}
            </div>
            <div className="dashboard-optionbox">
              <img src={addCert} className="dashboard-optionbox-icon" />
              <Link
                to="/input"
                style={{ textDecoration: "none", color: "white" }}
              >
                Input
              </Link>
              <div style={{ fontSize: 26 }} className="readex-pro">
                Create
              </div>
            </div>
            <div className="dashboard-certlist">
              <div
                style={{ fontSize: 32, fontWeight: "bold" }}
                className="readex-pro"
              >
                Certificate
              </div>
              <div style={{ margin: "1%" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Event</TableCell>
                        <TableCell align="right">Organization</TableCell>
                        <TableCell align="right">Created Date</TableCell>
                        <TableCell align="right">Last Modified</TableCell>
                        <TableCell align="right">More</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {aset.map((home) => (
                        <TableRow>
                          <TableCell>{home.Acara}</TableCell>
                          <TableCell align="right">{home.Organisasi}</TableCell>
                          <TableCell align="right">10 Feb 2023</TableCell>
                          <TableCell align="right">16 Mar 2023</TableCell>
                          <TableCell align="right">{">"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      {role == "admin" && (
        <div>
          <div style={{ height: "100%" }} className="dashboard-container">
            <div className="dashboard-content">
              <div className="dashboard-certlist">
                <div
                  style={{ fontSize: 32, fontWeight: "bold" }}
                  className="readex-pro"
                >
                  Approve organisasi yang terpercaya
                </div>
                <div style={{ margin: "1%" }}>
                  <table>
                    <tr>
                      <th>Organization</th>
                      <th>Email</th>
                      <th>Support File</th>
                      <th>Status</th>
                      <th>Approve</th>
                    </tr>
                    {userNotApprove.map((home) => (
                      <tr>
                        <td>{home.name}</td>
                        <td>{home.email}</td>
                        <td className="center-td">
                          <img
                            src={iconpdf}
                            className="dashboard-optionbox-icon"
                          />
                        </td>
                        <td>{home.status}</td>
                        <td>
                          <div>
                            <img
                              src={iconcheck}
                              className="dashboard-optionbox-icon"
                            />
                            <img
                              src={iconcross}
                              className="dashboard-optionbox-icon"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-container">
            <div className="dashboard-content">
              <div className="dashboard-certlist">
                <div
                  style={{ fontSize: 32, fontWeight: "bold" }}
                  className="readex-pro"
                >
                  Organisasi yang terpercaya
                </div>
                <div style={{ margin: "1%" }}>
                  <table>
                    <tr>
                      <th>Organization</th>
                      <th>Email</th>
                      <th>Support File</th>
                      <th>Status</th>
                      <th>Approve</th>
                    </tr>
                    {userApprove.map((home) => (
                      <tr>
                        <td>{home.name}</td>
                        <td>{home.email}</td>
                        <td className="center-td">
                          <img
                            src={iconpdf}
                            className="dashboard-optionbox-icon"
                          />
                        </td>
                        <td>{home.status}</td>
                        <td>
                          <div>
                            <img
                              src={iconcheck}
                              className="dashboard-optionbox-icon"
                            />
                            <img
                              src={iconcross}
                              className="dashboard-optionbox-icon"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
