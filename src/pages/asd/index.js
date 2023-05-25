import  QRCode  from 'qrcode';
import { Button } from '@mui/material';
import React, { useState,Component,Fragment } from 'react';
import './index.css'
import { useLocation } from 'react-router-dom';


const value ="https://youtu.be/dQw4w9WgXcQ"
function Qrcode1 (){
    const [url,setUrl]=useState("");
    const [qr, setQr]=useState("");
    const location=useLocation();
    const data = location.state.data;
    console.log(data);
    // const coba_luar =() =>{
      
    //   const data = location.state.data;
    //   console.log(data);
    // }
    const GenerateQRcode = () => {
      QRCode.toDataURL(
        value,
        {
          width : 800,
          margin : 2,
          color : {
            dark :"#00000000",
            light : "#FFFFFFFF",
          },
        },
        (err, url)=>{
          if (err) return console.error(err);
  
          console.log(url);
          setQr(url);
        //  url=value;
        }
      );
    };
    return(
      <div>
         {/* <input
        
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        ></input>  */}
      <Button 
      variant='contained'
      onClick={GenerateQRcode}
      > dod </Button>
      {/* {coba_luar()} */}
      {qr && (
        <>
        <img src={qr}/>
        <Button
        variant='contained'
        color='success'
        href={qr}
        download="qrcode.png"
        >
          hahaha
        </Button>
  
        </>
      )}
      </div>
    );
  }

  export default Qrcode1;