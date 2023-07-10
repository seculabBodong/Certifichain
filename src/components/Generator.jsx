import React, { useEffect, useRef, useState } from 'react'
import "./Generator.css"
import { useReactToPrint } from 'react-to-print';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import template1 from "../assets/cert_templates/Template1.png";
import template2 from "../assets/cert_templates/Template2.png";
import template3 from "../assets/cert_templates/Template3.png";
import template4 from "../assets/cert_templates/Template4.jpeg";
import ReactToPrint from 'react-to-print';
import {QRCodeCanvas} from 'qrcode.react';
import domtoimage from 'dom-to-image';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Papa from 'papaparse'

const value="this is placeeeeholder";

export class ComponentToPrint extends React.PureComponent {
 
    render() {
        // eslint-disable-next-line default-case
        switch(this.props.template){
            case "template1":{
                return (
                    <div style={{ position: 'relative' }} id="template1" >
                        <img src={template1} style={{ width: '45rem' }}></img>
        
                        <div className="info" style={{ position: 'absolute', top: '20%', width: '100%',textAlign:'center' }}>
                            <h2 style={{ textTransform: 'uppercase', color: '#0e4573', textDecoration: 'underline', marginBottom: '1rem', textOverflow:'clip' }}>{this.props.heading === '' ? 'Certificate of Achievement' : this.props.heading}</h2>
                        </div>
                        <div className="info" style={{ position: 'absolute', top: '30%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#ff9800', textTransform: 'uppercase', letterSpacing: '3px' }}>This is presented to</h3>
                        </div>
                        <div className="Nama_psrt" style={{ position: 'absolute', top: '35%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h1  style={{ fontSize: '3rem', color: '#33d5ac' }}>{this.props.name === '' ? 'Name' : this.props.name}</h1>
                            <p className='info' style={{ fontSize: '15px', fontWeight: '600', color: 'black' }}>{this.props.desc === '' ? 'for the active participation in the event and for giving efforts,ideas and Knowledge.' : this.props.desc}</p>
                        </div>
                        <div style={{left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '65%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '65%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '5%' }} alt="logo" />}
                        <QRCodeCanvas className='QR' style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={`http://172.16.10.53:3000/verify?id=["${this.props.certID}"]`}/>
                        {/* <p style={{ position: 'absolute', borderRadius: '0%', top: '95%', left: '50%', fontSize: '15px', color: 'black' }}>ID={this.props.certID === '' ? '' : this.props.certID}</p> */}
                    </div>
                );
            }
            case "template2":{
                return (
                    <div style={{ position: 'relative'}} id="template2">
                        <img src={template2} style={{ width: '45rem' }}></img>
                        <div className="info" style={{ position: 'absolute', top: '20%', width: '100%',textAlign:'center' }}>
                            <h2 style={{ textTransform: 'uppercase', color: '#0e4573', textDecoration: 'underline', marginBottom: '1rem', textOverflow:'clip' }}>{this.props.heading === '' ? 'Certificate of Achievement' : this.props.heading}</h2>
                        </div>
                        <div className="info" style={{ position: 'absolute', top: '30%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#ff9800', textTransform: 'uppercase', letterSpacing: '3px' }}>This is presented to</h3>
                        </div>
                        <div className="Nama_psrt" style={{ position: 'absolute', top: '35%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h1  style={{ fontSize: '3rem', color: '#33d5ac' }}>{this.props.name === '' ? 'Name' : this.props.name}</h1>
                            <p className='info' style={{ fontSize: '15px', fontWeight: '600', color: 'black' }}>{this.props.desc === '' ? 'for the active participation in the event and for giving efforts,ideas and Knowledge.' : this.props.desc}</p>
                        </div>
                        <div style={{left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '65%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '65%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '5%' }} alt="logo" />}
                        <QRCodeCanvas className='QR' style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={`http://172.16.10.53:3000/verify?id=["${this.props.certID}"]`}/>
                        <p style={{ position: 'absolute', borderRadius: '0%', top: '95%', left: '50%', fontSize: '15px', color: 'black' }}>ID={this.props.certID === '' ? '' : this.props.certID}</p>
                    </div>
                );
            }
            case "template3":{
                return (
                    <div style={{ position: 'relative'}} id="template3">
                        <img src={template3} style={{ width: '45rem' }}></img>
        
                        <div className="info" style={{ position: 'absolute', top: '20%', width: '100%',textAlign:'center' }}>
                            <h2 style={{ textTransform: 'uppercase', color: '#0e4573', textDecoration: 'underline', marginBottom: '1rem', textOverflow:'clip' }}>{this.props.heading === '' ? 'Certificate of Achievement' : this.props.heading}</h2>
                        </div>
                        <div className="info" style={{ position: 'absolute', top: '30%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#ff9800', textTransform: 'uppercase', letterSpacing: '3px' }}>This is presented to</h3>
                        </div>
                        <div className="Nama_psrt" style={{ position: 'absolute', top: '35%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h1  style={{ fontSize: '3rem', color: '#33d5ac' }}>{this.props.name === '' ? 'Name' : this.props.name}</h1>
                            <p className='info' style={{ fontSize: '15px', fontWeight: '600', color: 'black' }}>{this.props.desc === '' ? 'for the active participation in the event and for giving efforts,ideas and Knowledge.' : this.props.desc}</p>
                        </div>
                        <div style={{left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '65%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '65%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '5%' }} alt="logo" />}
                        <QRCodeCanvas className='QR' style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={`http://172.16.10.53:3000/verify?id=["${this.props.certID}"]`}/>
                        <p style={{ position: 'absolute', borderRadius: '0%', top: '95%', left: '50%', fontSize: '15px', color: 'black' }}>ID={this.props.certID === '' ? '' : this.props.certID}</p>
                    </div>
                );
            }
            case "template4":{
                return (
                    <div style={{ position: 'relative'}} id="template4">
                        <img src={template4} style={{ width: '45rem' }}></img>
                        <div className="info" style={{ position: 'absolute', top: '10%', width: '100%',textAlign:'center' }}>
                            <h2 style={{ textTransform: 'uppercase', color: '#0e4573', textDecoration: 'underline', marginBottom: '1rem', textOverflow:'clip' }}>{this.props.heading === '' ? 'Certificate of Achievement' : this.props.heading}</h2>
                        </div>
                        <div className="info" style={{ position: 'absolute', top: '20%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#ff9800', textTransform: 'uppercase', letterSpacing: '3px' }}>This is presented to</h3>
                        </div>
                        <div className="Nama_psrt" style={{ position: 'absolute', top: '30%',left:'10%',  width: '80%',textAlign:'center' }}>
                            <h1  style={{ fontSize: '3rem', color: '#33d5ac' }}>{this.props.name === '' ? 'Name' : this.props.name}</h1>
                            <p className='info' style={{ fontSize: '15px', fontWeight: '600', color: 'black' }}>{this.props.desc === '' ? 'for the active participation in the event and for giving efforts,ideas and Knowledge.' : this.props.desc}</p>
                        </div>
                        <div style={{left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '65%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '65%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: 'black', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '5%' }} alt="logo" />}
                        <QRCodeCanvas className='QR' style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={`http://172.16.10.53:3000/verify?id=["${this.props.certID}"]`}/>
                        <p style={{ position: 'absolute', borderRadius: '0%', top: '95%', left: '50%', fontSize: '15px', color: 'black' }}>ID={this.props.certID === '' ? '' : this.props.certID}</p>
                    </div>
                );
            }
        }
    }
}
const Popup = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-box">
                <button onClick={() => props.setpop(false)}>x</button>
                <h3 style={{fontWeight: '100'}}>Rules for Setup Printing Page</h3>
                <div className="content-pop">
                    <li>Destination: Save as PDF</li>
                    <li>Pages: All</li>
                    <li>Layout: Landscape</li>
                </div>
                <h3 style={{fontWeight: '100', marginTop: '10px'}}>More Settings</h3>
                <div className="content-pop">
                    <li>Paper Size: A4</li>
                    <li>Paper per Sheet:1</li>
                    <li>Margins: none</li>
                    <li>Scale: Custom 200</li>
                </div>
            </div>
        </div>
    ) : null;
}

function Generator(editData) {
    // console.log(editData.editData);
    const navigate = useNavigate();
    const [pop, setpop] = useState(false);
    const [name, setname] = useState('');
    const [nameCSV, setNameCSV]= useState('');
    const [heading, setheading] = useState('');
    const [desc, setdesc] = useState('');
    const [author_a, setauthor_a] = useState('');
    const [author_b, setauthor_b] = useState('');
    const [author1, setauthor1] = useState('');
    const [author2, setauthor2] = useState('');
    const [logo, setlogo] = useState('');
    const [ttd1, setttd1] = useState('');
    const [ttd2, setttd2] = useState('');
    const [template,settemplate]=useState('template1');
    const componentRef = useRef();
    const [theme, setTheme] = useState("dark");
    const [certID, setCertID] = useState("");
    const [currID, setCurrID] = useState("");
    const [imgSert, setImgSert] = useState("");
    const [imgCSV, setImgCSV] = useState("");
    const [msg, setMsg]= useState("");
    const [text,setText]=useState('');
    const [txId, setTxId]=useState('');
    const [submitType, setSubmitType]=useState("Generate Certificate");
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // console.log(`editData: ${editData}`);
    // console.log(`editData2: ${isObjectEmpty(editData)}`);

    // const checkBulk = (evt) => {
    //     var f = evt.target.files[0]; 
    //     if (f) {
    //         var r = new FileReader();
    //         r.onload = function(e) { 
    //             var contents = e.target.result;
    //             document.write("File Uploaded! <br />" + "name: " + f.name + "<br />" + "content: " + contents + "<br />" + "type: " + f.type + "<br />" + "size: " + f.size + " bytes <br />");
    
    //             var lines = contents.split("\n"), output = [];
    //             for (var i=0; i<lines.length; i++){
    //             output.push("<tr><td>" + lines[i].split(",").join("</td><td>") + "</td></tr>");
    //             }
    //             output = "<table>" + output.join("") + "</table>";
    //             document.write(output);
    //         }
    //         r.readAsText(f);
    //         document.write(output);
    //     } else { 
    //         alert("Failed to load file");
    //     }
    // }

    const checkData = () => {
        if (editData.editData.Nama) {
            console.log("rute edit");
            // console.log(editData.editData.Acara);
            setSubmitType("Update Certificate")
            setname(editData.editData.Nama);
            setheading(editData.editData.Acara);
            setdesc(editData.editData.Deskripsi);
            setauthor_a(editData.editData.Author1);
            setauthor_b(editData.editData.Author2);
            setauthor1(editData.editData.Jabatan1);
            setauthor2(editData.editData.Jabatan2);
            setlogo(editData.editData.Logo);
            setttd1(editData.editData.TTD1);
            setttd2(editData.editData.TTD2);
            setCurrID(editData.editData.ID);
            setTxId(editData.editData.txId);
        }
    }

    const nameCSVContain = [];
    const imgCSVContain = [];

    const bulkNameUpdate = () => {
        setname(nameCSV);
        // nameCSVContain.push(nameCSV);
        // console.log(nameCSVContain);
    }

    const [imgCSVArray, setImgCSVArray] = useState([]);

    const bulkImgUpdate = () => {
        // console.log(imgCSV);
        setImgSert(imgCSV);
        if(imgCSV){
            bulkImgArray(imgCSV);
        }
        // imgCSVContain.push(imgCSV);
        // console.log(imgCSV);
        // console.log(imgCSVArray);
    }
    
    const bulkImgArray = (object) => {
        setImgCSVArray(prevArray => [...prevArray, object]);
    }

    useEffect(() => {
        dispatch(getMe());
        checkData();
        _generateRandomID();
      }, [dispatch]);

    useEffect(() => {
        checkData();
    }, [editData]);

    useEffect(() => {
        bulkNameUpdate();
    }, [nameCSV]);

    useEffect(() => {
        bulkImgUpdate();
    }, [imgCSV]);

    useEffect(() => {
        handleConvert();
    });

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

    const handleChange = (event) =>{
        setText(event.target.value)
        setname(event.target.value)
    }

    const logoChange =(e)=>{
        if (e.target.files && e.target.files[0]){
            const reader = new FileReader();

            reader.onload = (ev) =>{
                const base64 = ev.target.result;
                setlogo(base64);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const ttd1Change=(e)=>{
        if (e.target.files && e.target.files[0]){
            const reader = new FileReader();

            reader.onload = (ev) =>{
                const base64 = ev.target.result;
                setttd1(base64);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const ttd2Change=(e)=>{
        if (e.target.files && e.target.files[0]){
            const reader = new FileReader();

            reader.onload = (ev) =>{
                const base64 = ev.target.result;
                setttd2(base64);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    }); 
    
    const downloadRef = useRef();

    const handleConvert = () => {
        let image = "";
        const targetEl = downloadRef.current;
        domtoimage.toJpeg(targetEl, { quality: 0.95 }).then((dataUrl) => {
            // console.log(dataUrl);
            image = dataUrl;
            setImgSert(dataUrl);
        });
        return image;
        // console.log(ttd1);
        // console.log(ttd2);
        //console.log(targetEl);
    }

    const _generateRandomID = async () => {
        let prefix = "";
        let length = 10;
        let ID = prefix + Math.random().toString(36).substring(2, length);
        await setCertID(ID.toString());
        // console.log(ID.toString());
        // return(console.log("safe"))
        // return ID.toString();
    }

    const printData = async () => {
        console.log([
            certID,
            logo,
            heading,
            user.name,
            name,
            "Webinar",
            desc,
            author_a,
            author1,
            ttd1,
            author_b,
            author2,
            ttd2,
            imgSert
        ])
    }

    const handleCheck = async (e) => {
        await _generateRandomID();
        // certID=randomID;
        const gmbr = await handleConvert();
        if(certID){
            printData();
        }
        // console.log(imgSert);
    }

    const qrrr =(e)=>{checkData();
        setCertID(e.target.value)
    }

    const handleUpload = async (e) => {
        await _generateRandomID();
        const gmbr = handleConvert();
        // console.log(certID);
        if(certID){
            try {
                await axios.post("http://172.16.10.53:4000/channels/mychannel/chaincodes/basic", {
                    fcn: "CreateAsset",
                    peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                    chaincodeName: "basic",
                    channelName: "mychannel",
                    args: [
                        certID,
                        logo,
                        heading,
                        user.name,
                        name,
                        "Webinar",
                        desc,
                        author_a,
                        author1,
                        ttd1,
                        author_b,
                        author2,
                        ttd2,
                        imgSert
                    ]
                }
                ,{
                    withCredentials: false,
                    headers: {
                        Authorization: `Bearer ${getCookie("myCookie")}`
                    },
                }
                );
                navigate('/');
                } catch (error) {
                    if(error.response){
                        setMsg(error.response.data.msg)
                }
            }
        }
    }

    const handleUpdate = async (e) => {
        const gmbr = handleConvert();
        try {
            await axios.put("http://172.16.10.53:4000/channels/mychannel/chaincodes/basic", {
                peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                chaincodeName: "basic",
                channelName: "mychannel",
                args: [
                    currID,
                    logo,
                    heading,
                    user.name,
                    name,
                    "Webinar",
                    desc,
                    author_a,
                    author1,
                    ttd1,
                    author_b,
                    author2,
                    ttd2,
                    imgSert
                ]
            }
            ,{
                withCredentials: false,
                headers: {
                    Authorization: `Bearer ${getCookie("myCookie")}`
                },
            }
            );
            navigate('/');
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg)
            }
        }
    }

    const postSelector = () => {
        if(submitType === "Generate Certificate"){
            handleUpload();
            setOpen(false);
            // handleCheck();
        }
        else if(submitType === "Update Certificate"){
            handleUpdate();
            setOpen(false);
            // handleCheck();
        }
        else if(submitType === "Generate Bulk Certificate"){
            uploadBulk();
            setOpen(false);
        }
    }

    let file = null;

    const handleChangeCSV = ({target: {files}}) => {
        file = files[0];
    }

    const importCSV2 = async () => {
        setSubmitType("Generate Bulk Certificate");
        let updates = [];
        console.log(file, "file");
        Papa.parse(file, {
            delimiter: "",
            chunkSize: 3,
            header: false,
            complete: (responses) => {
                pushCSV(responses.data);
            }
        })
    }

    const [arrayCSV, setArrayCSV] = useState([]);

    const pushCSV = async (nama) => {
        let loopID = certID;
        for(let i=1; i < (nama.length - 1); i++){
            await new Promise((resolve) => {
                setTimeout(() => {
                    setNameCSV(nama[i][0]);
                    // console.log(nameCSV);
                    resolve();
                }, 2000 * i)
            })

            await new Promise((resolve) => {
                let prefix = "";
                let length = 10;
                let ID = prefix + Math.random().toString(36).substring(2, length);
                loopID = ID.toString();
                setCertID(loopID);
                // console.log(arrayCSV);
                resolve();
            }, 2000 * i)

            await new Promise((resolve) => {
                setTimeout(() => {
                    const targetImg = downloadRef.current;
                    domtoimage.toJpeg(targetImg, { quality: 0.95 }).then((dataUrl) => {
                        // console.log(dataUrl);
                        // loopImg = dataUrl;
                        setImgCSV(dataUrl);
                    });
                    resolve();
                }, 2000 * i)
            })

            await new Promise((resolve) => {
                setTimeout(() => {
                    const dataCSV = {
                        certID: loopID,
                        logo: logo,
                        heading: heading,
                        username: user.name,
                        name: nama[i][0],
                        perihal: "Webinar",
                        desc: desc,
                        author_a: author_a,
                        author1: author1,
                        ttd1: ttd1,
                        author_b: author_b,
                        author2: author2,
                        ttd2: ttd2,
                        imgSert: imgSert
                    }
                    setArrayCSV(prevArray => [...prevArray, dataCSV])
                    resolve();
                }, 2000 * i)
            })
        }
    }

    const uploadBulk = async () => {
    // console.log(arrayCSV.length);
    // console.log(imgCSVArray);
     for(let i=0; i < arrayCSV.length; i++){
        console.log(arrayCSV[i]['certID']);
        await new Promise((resolve) => {
            setTimeout(() => {
                arrayCSV[i]['imgSert'] = imgCSVArray[i];
                // console.log(imgCSVArray[i]);
                axios.post("http://172.16.10.53:4000/channels/mychannel/chaincodes/basic", {
                    fcn: "CreateAsset",
                    peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                    chaincodeName: "basic",
                    channelName: "mychannel",
                    args: [
                        `${arrayCSV[i]['certID']}`,
                        `${arrayCSV[i]['logo']}`,
                        `${arrayCSV[i]['heading']}`,
                        `${arrayCSV[i]['username']}`,
                        `${arrayCSV[i]['name']}`,
                        "Webinar",
                        `${arrayCSV[i]['desc']}`,
                        `${arrayCSV[i]['author_a']}`,
                        `${arrayCSV[i]['author1']}`,
                        `${arrayCSV[i]['ttd1']}`,
                        `${arrayCSV[i]['author_b']}`,
                        `${arrayCSV[i]['author2']}`,
                        `${arrayCSV[i]['ttd2']}`,
                        `${arrayCSV[i]['imgSert']}`
                        ]
                    }
                        ,{
                            withCredentials: false,
                            headers: {
                                Authorization: `Bearer ${getCookie("myCookie")}`
                            },
                        }
                    );
                resolve();
            }, 5000 * i)
        })
     }
    }
    
    const delay = (ms) => new Promise(
        resolve => setTimeout(resolve, ms),
        console.log("delaying........")
    );

    return (
        <div className="main" style={{background: (theme == "dark")?"#EEEEEE":"white"}}>
            <Popup trigger={pop} setpop={setpop} >
            </Popup>
            <div className="maincontainer">
                <div className="leftmost">
                    <h1 style={{color: "black"}}>Templates</h1>
                             <div className={`templates ${template==='template1'?"active":""}`} onClick={()=>settemplate("template1")} >
                        <img src={template1} alt="" />
                    </div>
                    <div className={`templates ${template==='template2'?"active":""}`} onClick={()=>settemplate("template2")} >
                        <img src={template2} alt="" />
                    </div>
                    <div className={`templates ${template==='template3'?"active":""}`} onClick={()=>settemplate("template3")} >
                        <img src={template3} alt="" />
                    </div>
                    <div className={`templates ${template==='template4'?"active":""}`} onClick={()=>settemplate("template4")} >
                        <img src={template4} alt="" />
                    </div>
                </div>
                <div className="middle">
                    <div ref={downloadRef}>
                        <ComponentToPrint ref={componentRef} name={name} heading={heading} desc={desc} author_a={author_a} author_b={author_b} author1={author1} author2={author2} logo={logo} ttd1={ttd1} ttd2={ttd2} certID={certID} template={template} />
                    </div>
                </div>
                <div className="right">
                    <div className="form">
                        <div className="input-box">
                            <span className="details" style={{color: "black"}}>Event</span>
                            <input type="text" value={heading} placeholder='Enter Heading' onChange={e => { setheading(e.target.value) }} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: 'black'}}>Particpant Name</span>
                            <input className='Nama_psrt' value={name} placeholder="Enter Participant Name" type="text" onChange={handleChange} maxLength={18} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: 'black'}}>Description</span>
                            <textarea type="text" value={desc} placeholder="Enter Description" onChange={e => setdesc(e.target.value)} maxLength={155}/>
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: 'black'}}>Author Posisistion</span>
                            <input type="text" value={author_a} placeholder="Enter Author Posisition" onChange={e => setauthor_a(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: 'black'}}>Author Name</span>
                            <input type="text" value={author1} placeholder="Enter Author Name" onChange={e => setauthor1(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: 'black'}}>Author Posisistion</span>
                            <input type="text" value={author_b} placeholder="Enter Author Posisition" onChange={e => setauthor_b(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: 'black'}}>Author2 Name</span>
                            <input type="text" value={author2} placeholder="Enter Author2 Name" onChange={e => setauthor2(e.target.value)} />
                        </div>

                        <div >
                            <span className="details" style={{color: 'black'}}>Bulk Input</span>
                            <br style={{height:"10px"}}></br>
                            <input className='filetype' type='file' onChange={handleChangeCSV} accept='.csv, .xlsx' style={{color:'black'}}/>
                            <button onClick={importCSV2}>Confirm Bulk</button>
                        </div>

                        <div >
                            <span className="details" style={{color: 'black'}}>Logo</span>
                            <br style={{height:"10px"}}></br>
                            <input className='filetype' type='file' onChange={logoChange} accept='.jpg, .png, .jpeg, .bmp|image/*' style={{color:'black'}}/>
                        </div>

                        <div >
                            <span className="details" style={{color: 'black'}}>Tanda Tangan 1</span>
                            <br style={{height:"10px"}}></br>
                            <input className='filetype' type='file' onChange={ttd1Change} accept='.jpg, .png, .jpeg, .bmp|image/*' style={{color: 'black'}}/>
                        </div>

                        <div >
                            <span className="details" style={{color: 'black'}}>Tanda Tangan 2</span>
                            <br style={{height:"10px"}}></br>
                            <input className='filetype' type='file' onChange={ttd2Change} accept='.jpg, .png, .jpeg, .bmp|image/*' style={{color: 'black'}}/>
                        {/* {qrrr() } */}
                        </div>
                        <button className="generate" onClick={handleClickOpen}>{submitType}</button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                            {"Konfirmasi"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Pastikan data yang diisi sudah benar sebelum upload!
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Keluar</Button>
                            <Button onClick={() => postSelector()} autoFocus>
                                Benar
                            </Button>
                            </DialogActions>
                        </Dialog>
                        {/* <button className="generate" onChange={checkBulk}>Check CSV</button> */}
                        {/* <ReactToPrint
                            trigger={() => <button className="generate" >Print this out!</button>}
                            content={() => componentRef.current}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generator
