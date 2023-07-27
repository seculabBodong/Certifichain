import React, {useState, useEffect} from "react";
import "../../components/Verify.css";
import verify from  "../../components/verify.json"
import iconCheck from "../../assets/icon_checkmark.png"
import XCheck from "../../assets/icons8-cancel-48.png"
import certificate from "../../assets/certificate2.png"
import varrow from "../../assets/varrow.png"
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../features/commonService";



export function Verify() {
  const AKTIVASI = ["aktif", "none", "none"];

  const [buttonActive, setButtonActive] = useState(AKTIVASI);
  const [currentOption, setCurrentOption] = useState("informasi")
  const [informasiTampil, setInformasiTampil] = useState(false);
  const [hashTampil, setHashTampil] = useState(false);
  const [tambahanTampil, setTambahanTampil] = useState(false);
  const [certificate, setCertificate] = useState('');
  const [history, sethistory] = useState('');
  const [isLoading, setIsLoading]= useState(true);
  const [xstyle, setXstyle]= useState({});

  
  
  const location=useLocation();
  const [params]=useSearchParams();
  // console.log(params.get('id'))
  // var data = location.state.hasil;
  // data = `${data.result}`;
  // console.log(data)
  // let url=new URL(data)
  // const params=new URLSearchParams(url.search)
  // console.log(params.get('args'))
  // const params=new URLSearchParams(window.location.search)
  // console.log(params.get("id"))
  const checkCurrentOption  = (nomor) =>{
      if(nomor === 0){
        setButtonActive(["aktif", "none", "none"]);
        setCurrentOption("informasi");
      }
      else if (nomor === 1){
        setButtonActive(["none", "aktif", "none"]);
        setCurrentOption("hash");
      }
      else  {
        setButtonActive(["none", "none", "aktif"]);
        setCurrentOption("tambahan");
      }
      // console.log(buttonActive)
      // console.log(currentOption)
    }
    

    const getCertification = async () => {
      
      // if(!isStop){
      // const url = `http://172.16.10.53:4000/home?args=["zy621d33"]`;
      console.log("ALHAMDULILAH");      
      try { const response = await axios.get( 
      `https://hyperledger.seculab.space/home?args=["${params.get('id').replace(/"/g,'').replace("[",'').replace("]",'')}"]`) 
      console.log(response.data); 
        // console.log(response.data);
        setCertificate(response.data); 
        // console.log(certificate.successs);
        setIsLoading(false);
        return response.data;
      } catch (error) {
        if (error.response) {
          const message = error.response.data.msg;
        console.log("GAGAL");
        return message;
      }
    }
  // }
  }
    useEffect(()=>{
    // let isStop= false;
  getCertification();

},[])

  
  const getHistory= async () => {
    // const url = `http://172.16.10.53:4000/home?args=["zy621d33"]`;
    console.log("ALHAMDULILAH");
    try { const response = await axios.get( 
    `https://hyperledger.seculab.space/history?args=["${params.get('id').replace(/"/g,'').replace("[",'').replace("]",'')}"]`) 
    console.log(response.data);
    const panjang = response.data.length ===1 ? 1:response.data.length-1
      sethistory(response.data[response.data.length-panjang]); 
      // console.log(history);
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
    currentOption === "informasi" ? setInformasiTampil(true) : setInformasiTampil(false)
    currentOption === "hash" ? setHashTampil(true) : setHashTampil(false)
    currentOption === "tambahan" ? setTambahanTampil(true) : setTambahanTampil(false)
    // getCertification();
    // console.log(location.state.hasil)
    
  }, [currentOption]
  );
  
  useEffect(()=>{
    if(!isLoading && certificate.successs===false){
      // alert("tidak ada bos")
      // setCertificate(prevcertificate =>({...prevcertificate, Certificate: verify.template}))
      setCertificate(prevcertificate =>({
      ...prevcertificate, 
      ID: 'xxxxxxxx',
      Acara: 'xxxxxxxx',
      Nama: 'xxxxxxxx',
      Organisasi: 'xxxxxxxx',
      Perihal: 'xxxxxxxx',
      Deskripsi: 'xxxxxxxx',
      Author1: 'Jabatan 1',
      Author2: 'Jabatan 2',
      Jabatan1: 'xxxxxxxx',
      Jabatan2: 'xxxxxxxx',
      txId:'Tidak ada transaksi',
      Certificate: verify.template,
      statusnya:"TIDAK TERDAFTAR DI BLOCKCHAIN",
      checkmark : XCheck
    }))
    sethistory(prevcertificate =>({
      ...prevcertificate, 
      ID: 'xxxxxxxx',
      Acara: 'xxxxxxxx',
      Nama: 'xxxxxxxx',
      Organisasi: 'xxxxxxxx',
      Perihal: 'xxxxxxxx',
      Deskripsi: 'xxxxxxxx',
      Author1: 'Jabatan 1',
      Author2: 'Jabatan 2',
      Jabatan1: 'xxxxxxxx',
      Jabatan2: 'xxxxxxxx',
      txId:'xxxxxxxx',
      Timestamp: 'Invalid'
    }))
    
    setXstyle(prevstyle=>({
      ...prevstyle,
      border: "3px solid #ff0000"
    }))
      
    }else{
      setCertificate(prevcertificate =>({
        ...prevcertificate, 
        statusnya:"TERFERIVIKASI",
        checkmark : iconCheck,
      }))
    }
    // console.log('cek1')
  },[isLoading,certificate]);

  useEffect(()=>{
    // getCertification();
    getHistory();
  }, [])
  //
  const isiInformsi = ()=> {
    return(
      <div className="left-width">
      <p className="text" style={{ color: 'black',}} > 
        ID Sertifikat: {certificate.ID}<br style={{content:'',margin: '0.25em'}}/>
        Acara : {certificate.Acara}<br style={{content:'',margin: '0.25em'}}/>
        Nama peserta: {certificate.Nama}<br style={{content:'',margin: '0.25em'}}/>
        Pelaksana : {certificate.Organisasi}<br style={{content:'',margin: '0.25em'}}/>
        Jenis Kegiatan : {certificate.Perihal}<br style={{content:'',margin: '0.25em'}}/>  
        Detail Kegiatan : {certificate.Deskripsi}<br style={{content:'',margin: '0.25em'}}/> 
        {certificate.Author1} : {certificate.Jabatan1}<br style={{content:'',margin: '0.25em'}}/>
        {certificate.Author2} : {certificate.Jabatan2}<br style={{content:'',margin: '0.25em'}}/>
      </p>
      </div>
      
      )
    }
  const isiHash = () =>{
    return (
      <div className="left-width">
        <p className="text" style={{ color: 'black',}} >
          {certificate.txId}
        </p>
      </div>
    )
  }
  const isiTambahan = () =>{
    return(
      <div className="left-width">
      <p className="text" style={{ color: 'black',}} > 
        Transaction ID: <br style={{content:'',margin: '0.25em'}}/>
        {history.TxId}<br style={{content:'',margin: '0.25em'}}/>
        <br style={{content:'',margin: '0.25em'}}/>
        ID Sertifikat: {history.Value.ID}<br style={{content:'',margin: '0.25em'}}/>
        Acara : {history.Value.Acara}<br style={{content:'',margin: '0.25em'}}/>
        Nama peserta: {history.Value.Nama}<br style={{content:'',margin: '0.25em'}}/>
        Pelaksana : {history.Value.Organisasi}<br style={{content:'',margin: '0.25em'}}/>
        Jenis Kegiatan : {history.Value.Perihal}<br style={{content:'',margin: '0.25em'}}/>  
        Detail Kegiatan : {history.Value.Deskripsi}<br style={{content:'',margin: '0.25em'}}/> 
        {history.Value.Author1} : {history.Value.Jabatan1}<br style={{content:'',margin: '0.25em'}}/>
        {history.Value.Author2} : {history.Value.Jabatan2}<br style={{content:'',margin: '0.25em'}}/>
        Sertifikat dirubah pada : <br style={{content:'',margin: '0.25em'}}/>
        {history.Timestamp}<br style={{content:'',margin: '0.25em'}}/>
      </p>
      </div>
    )
  }
    
    return (
      <>
      {certificate && (
      <div className="main-container">
      
        <div className="left-container">
          <ul className="left-options">
            <li value="informasi" className={`horizontal-div ${buttonActive[0]}`} onClick={() => checkCurrentOption(0)}>Informasi</li>
            <li value="hash" className={`horizontal-div ${buttonActive[1]}`} onClick={() => checkCurrentOption(1)}>Hash</li>
            <li value="tambahan" className={`horizontal-div ${buttonActive[2]}`} onClick={() => checkCurrentOption(2)}>Tambahan</li>          
          </ul>
          <div className="left-description">
            {informasiTampil && isiInformsi()}
            {hashTampil && isiHash()}
            {tambahanTampil && isiTambahan()}
          </div>
        </div>
        <div className="right-container">
          <div className="pop-verified" style={xstyle}>
            <img src={certificate.checkmark} style={{width: 50}}/>
            <div>SERTIFIKAT {certificate.statusnya}</div>
            {/* {console.log(location.state.hasil)} */}
            <div>Sertifikat diterbitkan oleh {certificate.Organisasi} dari TELKOM UNIVERSITY</div>
            {/* {getCertification} */}
          </div>
          <div className="display-cert">
            {/* {console.log(certificate.Certificate)} */}
            <img src={certificate.Certificate} className="display-cert-img"/>
          </div>
        </div>
      </div>
    )}
    </>
  );
    
}
