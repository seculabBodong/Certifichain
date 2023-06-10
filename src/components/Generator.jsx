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
import {
    exportComponentAsJPEG,
    exportComponentAsPDF,
    exportComponentAsPNG
  } from "react-component-export-image";
import domtoimage from 'dom-to-image';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';

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
                            <p className='info' style={{ fontSize: '15px', fontWeight: '600', color: '#ff9800' }}>{this.props.desc === '' ? 'for the active participation in the event and for giving efforts,ideas and Knowledge.' : this.props.desc}</p>
                        </div>
                        <div style={{left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: '#0e4573', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '65%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: '#ff9800', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: '#0e4573', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '65%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: '#ff9800', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '5%' }} alt="logo" />}
                        <QRCodeCanvas className='QR' style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={`http://localhost:4000/home?args=["${this.props.certID}"]`}/>
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
                            <p className='info' style={{ fontSize: '15px', fontWeight: '600', color: '#ff9800' }}>{this.props.desc === '' ? 'for the active participation in the event and for giving efforts,ideas and Knowledge.' : this.props.desc}</p>
                        </div>
                        <div style={{left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: '#0e4573', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '65%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: '#ff9800', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: '#0e4573', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '65%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: '#ff9800', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '85%' }} alt="logo" />}
                        <QRCodeCanvas style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={value} />
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
                            <p className='info' style={{ fontSize: '15px', fontWeight: '600', color: '#ff9800' }}>{this.props.desc === '' ? 'for the active participation in the event and for giving efforts,ideas and Knowledge.' : this.props.desc}</p>
                        </div>
                        <div style={{left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: '#0e4573', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '65%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: '#ff9800', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '59%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: '#0e4573', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '65%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '15px', color: '#ff9800', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '5%' }} alt="logo" />}
                        <QRCodeCanvas style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={value} />
        
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
                        <div className="author" style={{ position: 'absolute', top: '54%', left: '10%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase', left:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>{this.props.author_a=== '' ? 'Course Director':this.props.author_a}</h2>
                        </div>
                        <div className="author1" style={{ position: 'absolute', top: '60%', left: '5%', width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '12px', color: 'black', textTransform: 'uppercase' }}>{this.props.author1 === '' ? 'Author Name' : this.props.author1}</h1>
                            {this.props.ttd1 === '' ? "" : <img src={this.props.ttd1} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', left: '30%' }} alt="ttd1" />}
                        </div>
                        </div>
                        <div style={{left: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>                            
                        <div className="author" style={{ position: 'absolute', top: '54%', left: '70%', width: '20%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '12px', color: 'black', textDecoration: 'underline', textTransform: 'uppercase' }}>{this.props.author_b=== '' ? 'Course Director':this.props.author_b}</h2>
                        </div>
                        <div className="author2" style={{ position: 'absolute', top: '60%', left: '65%',  width: '30%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '12px', color: 'black', textTransform: 'uppercase' }}>{this.props.author2 === '' ? 'Author2 Name' : this.props.author2}</h1>
                            {this.props.ttd2 === '' ? "" : <img src={this.props.ttd2} style={{ position: 'absolute', width: '5rem', borderRadius: '0%', top: '200%', right: '30%' }} alt="ttd2" />}
                        </div>
                        </div>
                        {this.props.logo === '' ? "" : <img src={this.props.logo} style={{ position: 'absolute', width: '4rem', borderRadius: '0%', top: '5%', right: '5%' }} alt="logo" />}
                        <QRCodeCanvas style={{ position: 'absolute', borderRadius: '0%', top: '70%', left: '42.5%' }} value={this.props.ttd2==='' ? '':<img/>} />
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

function Generator() {
    const [pop, setpop] = useState(false);
    const [name, setname] = useState('');
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
    const [msg, setMsg]= useState("");
    const [text,setText]=useState('');
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
        
      }, [dispatch]);

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
        const targetEl = downloadRef.current;
        domtoimage.toJpeg(targetEl, { quality: 0.95 }).then((dataUrl) => {
            console.log(dataUrl);
            return dataUrl;
        });
        // console.log(ttd1);
        // console.log(ttd2);
        //console.log(targetEl);
    }

    const handleCheck = async (e) => {
        _generateRandomID();
        // certID=randomID;
        const gmbr = handleConvert();
        console.log(gmbr);
        console.log([
            certID,
            heading,
            user.name,
            name,
            desc,
            author_a,
            author1,
            ttd1,
            author_b,
            author2,
            ttd2,
        ])
    }

    const qrrr =(e)=>{
        setCertID(e.target.value)
    }

    const handleUpload = async (e) => {
        _generateRandomID();
        e.preventDefault();
        try {
        await axios.post("http://localhost:4000/channels/mychannel/chaincodes/basic", {
            fcn: "CreateAsset",
            peers: ["peer0.org1.example.com","peer0.org2.example.com"],
            chaincodeName: "basic",
            channelName: "mychannel",
            args: [
                certID,
                heading,
                user.name,
                name,
                "Webinar",
                desc,
                ttd1,
                ttd2,
                certID
            ]
        }
        , {
            withCredentials: false,
            headers: {
                Authorization: `Bearer ${getCookie("myCookie")}`
            },
        }
        );
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
        }
        }
    }

    const _generateRandomID = () => {
        let prefix = "";
        let length = 10;
        let ID = prefix + Math.random().toString(36).substring(2, length);
        setCertID(ID.toString());
        // return ID.toString();
    }

      
    return (
        <div className="main" style={{background: (theme == "dark")?"rgb(28, 39, 43)":"white"}}>
            <Popup trigger={pop} setpop={setpop} >
            </Popup>
            <div className="maincontainer">
                <div className="leftmost">
                    <h1 style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Templates</h1>
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
                <div className="middle" >
                    <div ref={downloadRef}>
                        <ComponentToPrint ref={componentRef} name={name} heading={heading} desc={desc} author_a={author_a} author_b={author_b} author1={author1} author2={author2} logo={logo} ttd1={ttd1} ttd2={ttd2} certID={certID} template={template} />
                    </div>
                </div>
                <div className="right">
                    <div className="form">
                        <div className="input-box">
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Event</span>
                            <input type="text" placeholder="Enter Certification" onChange={e => { setheading(e.target.value) }} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Particpant Name</span>
                            <input className='Nama_psrt' value={text} type="text" placeholder="Enter participant Name" onChange={handleChange} maxLength={18} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Description</span>
                            <textarea type="text" placeholder="Enter Description" onChange={e => setdesc(e.target.value)} maxLength={155}/>
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Author Posisistion</span>
                            <input type="text" placeholder="Enter Author Posisition" onChange={e => setauthor_a(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Author Name</span>
                            <input type="text" placeholder="Enter Author Name" onChange={e => setauthor1(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Author Posisistion</span>
                            <input type="text" placeholder="Enter Author Posisition" onChange={e => setauthor_b(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Author2 Name</span>
                            <input type="text" placeholder="Enter Author2 Name" onChange={e => setauthor2(e.target.value)} />
                        </div>
                        <div >
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Logo</span>
                            <br style={{height:"10px"}}></br>
                            <input className='filetype' type='file' onChange={logoChange} accept='.jpg, .png, .jpeg, .bmp|image/*' style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}/>
                        </div>

                        <div >
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Tanda Tangan 1</span>
                            <br style={{height:"10px"}}></br>
                            <input className='filetype' type='file' onChange={ttd1Change} accept='.jpg, .png, .jpeg, .bmp|image/*' style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}/>
                        </div>

                        <div >
                            <span className="details" style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}>Tanda Tangan 2</span>
                            <br style={{height:"10px"}}></br>
                            <input className='filetype' type='file' onChange={ttd2Change} accept='.jpg, .png, .jpeg, .bmp|image/*' style={{color: (theme == "dark")?"white":"rgb(28, 39, 43)"}}/>
                        {/* {qrrr() } */}
                        </div>
                        <button className="generate" onClick={() => handleCheck()}>Generate  Certificate</button>
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
