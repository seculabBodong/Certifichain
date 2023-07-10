import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import iconpdf from "../../assets/file-download.png";
import iconcheck from "../../assets/icon_checkmark.png";
import iconcross from "../../assets/close-circle.png";
import axios from "axios";

export function Dashboard(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [aset, setAset] = useState([]);
    const {isError} = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    
    const getAsset = async () => {
        console.log("ALHAMDULILAH");
        try {
          const response = await axios.get(
            `http://172.16.10.53:4000/dashboard?args=["seculab"]&peer=peer0.org1.example.com&fcn=AssetByOrganisasi`,
            {
              withCredentials: false,
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg2ODg0MzAsInVzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2ODg1ODA0MzB9.rkBbuNCuktiBSFFU04VEGI9W--HbpM0pJ8luUU2dGKQ`,
              },
            }
          );
          console.log(response.data[0]['Acara']);
          const myArray = [];
          for(let i=0; i < response.data.length; i++){
            const condition = myArray.every((item) => response.data[i]['Acara'] !== item.Acara);
            if(condition){
                myArray.push(response.data[i]);
            }
            console.log(myArray);
          }
          console.log(myArray);
        //   setAset(response.data);
          // console.log(aset);
        //   return response.data;
        } catch (error) {
          if (error.response) {
            const message = error.response.data.msg;
            console.log("GAGAL");
            return message;
          }
        }
      };

    return(
        <>
            <div>
                {/* {aset.map((data)=>{
                    return(<li>
                        {data.ID}
                    </li>)
                })}*/}
                <button onClick={getAsset}>oke</button> 
            <div style={{ height: "100%"}} className="dashboard-container">
                <div className="dashboard-content">
                    <div className="dashboard-certlist">
                        <div style={{ fontSize: 32, fontWeight: "bold"}} className="readex-pro">Approve organisasi yang terpercaya</div>
                        <div style={{ margin: "1%"}}> 
                        <table>
                            <tr>
                            <th>Organization</th>
                            <th>Email</th>
                            <th>Support File</th>
                            <th>Status</th>
                            <th>Approve</th>
                            </tr>
                            <tr>
                            <td>USER</td>
                            <td>organisasix@gmail.com</td>
                            <td><img src={iconpdf} style={{ alignItems: "center"}} className="dashboard-optionbox-icon"/></td>
                            <td>no status</td>
                            <td><img src={iconcheck} className="dashboard-optionbox-icon"/><img src={iconcross} className="dashboard-optionbox-icon"/></td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>
                </div>

                <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="dashboard-certlist">
                        <div style={{ fontSize: 32, fontWeight: "bold"}} className="readex-pro">Approve organisasi yang terpercaya</div>
                        <div style={{ margin: "1%"}}> 
                        <table>
                            <tr>
                            <th>Organization</th>
                            <th>Email</th>
                            <th>Support File</th>
                            <th>Status</th>
                            <th>Approve</th>
                            </tr>
                            <tr>
                            <td>USER</td>
                            <td>organisasix@gmail.com</td>
                            <td><img src={iconpdf} className="dashboard-optionbox-icon"/></td>
                            <td>no status</td>
                            <td><div><img src={iconcheck} className="dashboard-optionbox-icon"/><img src={iconcross} className="dashboard-optionbox-icon"/></div></td>
                            </tr>
                            <tr>
                            <td>USER</td>
                            <td>organisasix@gmail.com</td>
                            <td><img src={iconpdf} className="dashboard-optionbox-icon"/></td>
                            <td>approve</td>
                            <td><div><img src={iconcheck} className="dashboard-optionbox-icon"/><img src={iconcross} className="dashboard-optionbox-icon"/></div></td>
                            </tr>
                            <tr>
                            <td>USER</td>
                            <td>organisasix@gmail.com</td>
                            <td><img src={iconpdf} className="dashboard-optionbox-icon"/></td>
                            <td>disapprove</td>
                            <td><div><img src={iconcheck} className="dashboard-optionbox-icon"/><img src={iconcross} className="dashboard-optionbox-icon"/></div></td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}