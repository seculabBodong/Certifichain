import React, {useState, useEffect} from "react";
import "../../components/Event.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import iconpdf from "../../assets/file-download.png";
import iconcheck from "../../assets/icon_checkmark.png";
import iconcross from "../../assets/close-circle.png";
import iconedit from "../../assets/note-edit.png";
import icondelete from "../../assets/delete.png";
import iconadd from "../../assets/plus-circle.png";
import axios from "axios";

export function Event(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [aset, setAset] = useState([]);
    const {isError} = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    
    return(
        <>
            <div>
                <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="dashboard-certlist">
                        <div className="event-top">
                            <div style={{ fontSize: 32, fontWeight: "bold"}} className="readex-pro">EVENT : STUDY GROUP 2023</div>
                            <img style={{ paddingRight: "12%"}} src={iconadd} className="dashboard-optionbox-icon"/>
                        </div>
                        <div style={{ margin: "1%"}}> 
                        <table>
                            <tr>
                            <th>Nama</th>
                            <th>Created Date</th>
                            <th>Last Modified</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                            </tr>
                            <tr>
                            <td>USER</td>
                            <td>10 Feb 2023</td>
                            <td>16 Mar 2023</td>
                            <td><img src={iconedit} className="dashboard-optionbox-icon"/></td>
                            <td><img src={icondelete} className="dashboard-optionbox-icon"/></td>
                            </tr>
                            <tr>
                            <td>USER</td>
                            <td>10 Feb 2023</td>
                            <td>16 Mar 2023</td>
                            <td><img src={iconedit} className="dashboard-optionbox-icon"/></td>
                            <td><img src={icondelete} className="dashboard-optionbox-icon"/></td>
                            </tr>
                            <tr>
                            <td>USER</td>
                            <td>10 Feb 2023</td>
                            <td>16 Mar 2023</td>
                            <td><img src={iconedit} className="dashboard-optionbox-icon"/></td>
                            <td><img src={icondelete} className="dashboard-optionbox-icon"/></td>
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