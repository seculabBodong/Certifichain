import React, {useState, useEffect} from "react";
import "../../components/Event.css";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";
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
import { getCookie } from "../../features/commonService";
import { Dialog, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

export function Event(){
    const [searchparams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [participant, setParticipant] = useState([]);
    const {isError} = useSelector((state => state.auth));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDownload = (payload) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = payload;
        downloadLink.download = "sertifikat";
        downloadLink.click();
    };

    const getParticipant = async () => {
        console.log("ALHAMDULILAH");
        try {
            const response = await axios.get(
            `http://172.16.10.53:4000/dashboard?args=["${searchparams.get("org")}", "${searchparams.get("acara")}"]&peer=peer0.org1.example.com&fcn=AssetByAcara`,
            {
                withCredentials: false,
                headers: {
                Authorization: `Bearer ${getCookie("myCookie")}`,
                },
            }
            );
            // console.log(response.data);
            setParticipant(response.data);
            // console.log(participant);
            return response.data;
        } catch (error) {
            if (error.response) {
            const message = error.response.data.msg;
            console.log("GAGAL");
            return message;
            }
        }
    }

    const deleteAset = async (id) => {
        console.log("ALHAMDULILAH");
        try {
            const response = await axios.delete(
            `http://172.16.10.53:4000/channels/mychannel/chaincodes/basic`,
            {
                withCredentials: false,
                headers: {
                    Authorization: `Bearer ${getCookie("myCookie")}`,
                },
                    data: {
                        peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                        chaincodeName:"basic",
                        channelName: "mychannel",
                        args: [`${id}`]
                    }
                },
            );
            // console.log(response.data);
            navigate("/");
            return response.data;
        } catch (error) {
            if (error.response) {
            const message = error.response.data.msg;
            console.log("GAGAL");
            return message;
            }
        }
    }

    useEffect(() => {
        dispatch(getMe());
        getParticipant();
    }, [dispatch]);
    
    return(
        <>
            <div>
                <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="dashboard-certlist">
                        <div className="event-top">
                            <div style={{ fontSize: 32, fontWeight: "bold"}} className="readex-pro">EVENT : {searchparams.get("acara")}</div>
                            <img style={{ paddingRight: "12%"}} src={iconadd} className="dashboard-optionbox-icon"/>
                        </div>
                        <div style={{ margin: "1%"}}> 
                        <table style={{fontSize: 16}}>
                            <tr>
                            <th>Nama</th>
                            <th>Created Date</th>
                            <th>Last Modified</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                            </tr>
                            {participant.map((home) => (
                                <tr>
                                <td>{home.Nama}</td>
                                <td>{home.time.createDate}</td>
                                <td>{home.time.lastModified}</td>
                                <td>
                                <IconButton>
                                    <img src={iconpdf} className="dashboard-optionbox-icon" onClick={handleClickOpen}/>
                                </IconButton>
                                </td>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <img width='100%' height='100%' src={`${home.Certificate}`}/>
                                    <IconButton onClick={() => handleDownload(home.Certificate)}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Dialog>
                                <td>
                                    <IconButton 
                                        onClick={() => navigate({
                                            pathname: "/input",
                                            search: createSearchParams({
                                                ID: home.ID
                                            }).toString()
                                    })}>
                                        <img src={iconedit} className="dashboard-optionbox-icon" />
                                    </IconButton>
                                </td>
                                <td>
                                    <IconButton onClick={() => deleteAset(home.ID)}>
                                        <img src={icondelete} className="dashboard-optionbox-icon" />
                                    </IconButton>
                                </td>
                                </tr>
                            ))}
                        </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}