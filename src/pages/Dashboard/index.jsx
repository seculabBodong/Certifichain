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
            const response = await axios.get('http://localhost:4000/home?args=[]&peer=peer0.org1.example.com&fcn=GetAllAssets', {withCredentials: false, headers: { 
                Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY5MDcyNzYsInVzZXJuYW1lIjoidGVzdF91c2VyMyIsIm9yZ05hbWUiOiJPcmcxIiwiaWF0IjoxNjc2ODcxMjc2fQ.yzkE9ZxUkVNDl_cAzDRJxIP_vJTiguyEf4fSmTghpyk'
              }});
            // console.log(response.data);
            setAset(response.data);
            console.log(response.data);
            return response.data
        } catch (error) {
            if(error.response){
                const message = error.response.data.msg;
                console.log("AMJING");
                return message;
            }
        }
    }

    return(
        <>
            <div>
                {/* {aset.map((data)=>{
                    return(<li>
                        {data.ID}
                    </li>)
                })}
                <button onClick={getAsset}>oke</button> */}
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