import "../../components/Home.css";
import React, { useState, useEffect } from "react";
import { Link, Navigate, createSearchParams } from "react-router-dom";
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
import { handleApprove, handleNotApprove } from "../../features/adminService";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [aset, setAset] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userApprove, setUserApprove] = useState([]);
  const [userNotApprove, setUserNotApprove] = useState([]);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("");
  const [ status, setStatus ] = useState("");
  const [orgname, setOrgname] = useState();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { blockchainUser } = useSelector((state) => state.auth);
  const currentState = store.getState();
  
  useEffect(() => {
    dispatch(getMe());
    getAsset();
  }, [dispatch, orgname]);

  useEffect(() => {
    // console.log(user.role);
    if (user) {
      setOrgname(user.name);
      setRole(user.role);
      setStatus(user.status);
    }
    getUser();
  }, [user, role, orgname]);

  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      // console.log(result)
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }

  const getAsset = async () => {
    console.log("ALHAMDULILAH");
    try {
      const response = await axios.get(
        `http://172.16.10.53:4000/dashboard?args=["${orgname}"]&peer=peer0.org1.example.com&fcn=AssetByOrganisasi`,
        {
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${getCookie("myCookie")}`,
          },
        }
      );
      // console.log(response.data);
      // setAset(response.data);
      // console.log(aset);
      const myArray = [];
          for(let i=0; i < response.data.length; i++){
            const condition = myArray.every((item) => response.data[i]['Acara'] !== item.Acara);
            if(condition){
                myArray.push(response.data[i]);
            }
            // console.log(myArray);
          }
      setAset(myArray);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("GAGAL");
        return message;
      }
    }
  };

  const toInput = () => {
    navigate("/input")
  }

  const getUser = async () => {
    console.log("MANTAP");
    try {
      const response = await axios.get(`http://172.16.10.53:5000/users`);
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
  // console.log(userApprove);
  // console.log(userNotApprove);

  const openNewTab = (url) => {
    window.open(url, "_blank", "noreferer");
  }
  
  return (
    <>
      {!user && (
        <div className="container">
          <div className="content">
            <div className="text-title">SELAMAT DATANG!</div>
            <div className="text-content">
              Certifichain adalah web yang membantu anda verifikasi sertifikat
              dengan mudah
            </div>
            <div className="input-container-home">
              <div className="input-container2">
                <text>Scan Sertifikatmu</text>
                <text>atau</text>
                <div className="pilih-file-home">
                  <label for="upload-file">Pilih File</label>
                  <input type="file" name="photo" id="upload-file" onChange={handleFileChange}>
                  </input>
                  {/* {test =()=>{
                      if (result!='') {
                        navigate('/verify',{state:{hasil:result}});
                      }
                      else {
                        console.log(result);
                      }
                    }} */}
                    <p>{infoText}</p>
                    {console.log(result)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {(status == "approved" && role == "client" ) && (
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div
              style={{ fontSize: 32, fontWeight: "bold" }}
              className="dashboard-user readex-pro"
            >
              HI, {orgname}
            </div>
            <div>
              <Button className="dashboard-optionbox" variant="outlined" onClick={() => toInput()} startIcon={<img src={addCert} className="dashboard-optionbox-icon" />}>
                Create
              </Button>
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
                          <TableCell align="right">{home.time.createDate}</TableCell>
                          <TableCell align="right">{home.time.lastModified}</TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => navigate({
                              pathname: "/event",
                              search: createSearchParams({
                               acara: home.Acara,
                               org: home.Organisasi
                              }).toString()
                            })}>
                              <ArrowForwardIos />
                            </IconButton>
                          </TableCell>
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
      {status == "not_approved" && (
        <div className="belum-approve-container">
          <div className="belum-approve readex-pro">
            <img
              src={iconcross}
              className="dashboard-optionbox-icon"
            />
            <div>Anda belum terverifikasi!</div>
            <div>Harap menunggu proses approval</div>
          </div>
        </div>
      )}
      {(status == "approved" && role == "admin" ) && (
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
                            onClick={() => openNewTab(`${home.urlDoc}`)}
                            className="dashboard-optionbox-icon"
                          />
                        </td>
                        <td>{home.status}</td>
                        <td>
                          <div>
                            <img
                              src={iconcheck}
                              className="dashboard-optionbox-icon"
                              onClick={() => handleApprove(home.uuid)}
                            />
                            <img
                              src={iconcross}
                              className="dashboard-optionbox-icon"
                              onClick={() => handleNotApprove(home.uuid)}
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
                      <th>Cancel Approve</th>
                    </tr>
                    {userApprove.map((home) => (
                      <tr>
                        <td>{home.name}</td>
                        <td>{home.email}</td>
                        <td className="center-td">
                          <img
                            src={iconpdf}
                            className="dashboard-optionbox-icon"
                            onClick={() => openNewTab(`${home.urlDoc}`)}
                          />
                        </td>
                        <td>{home.status}</td>
                        <td>
                          <div>
                            {/* <img
                              src={iconcheck}
                              className="dashboard-optionbox-icon"
                              onClick={() => handleApprove(home.uuid)}
                            /> */}
                            <img
                              src={iconcross}
                              className="dashboard-optionbox-icon"
                              onClick={() => handleNotApprove(home.uuid, user.uuid)}
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
