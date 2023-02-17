import React, {useState, useEffect} from "react";
import "../../components/Verify.css";
import iconCheck from "../../assets/icon_checkmark.png"
import certificate from "../../assets/certificate2.png"
import varrow from "../../assets/varrow.png"

export function Verify() {
  const AKTIVASI = ["aktif", "none", "none"];

  const isiInformsi = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing. At volutpat diam ut venenatis tellus in metus vulputate. Libero justo laoreet sit amet cursus sit amet. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Amet consectetur adipiscing elit ut aliquam. Blandit libero volutpat sed cras ornare arcu. Gravida arcu ac tortor dignissim convallis aenean et tortor at. At elementum eu facilisis sed odio morbi quis commodo odio. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Tortor at auctor urna nunc id. Aenean et tortor at risus viverra."
  const isiHash = "c3759f5f14f1b741add47025bedb0 b54278b31c47300d2ea47abe1067245ad32"
  const isiTambahan = "KEQINGG........... KEEEQIIING KEEQIING KEEEEEEEGIIIIIING AAAAAAAAA ❤ ❤ ❤ ❤ WANGI WANGI WANGI WANGI HU HA HU HA HU HA, aaaah baunya KEQING wangi aku mau nyiumin aroma wanginya KEQING AAAAAAAAH ~~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~~~~ AAAAAH KEQING MANIS BANGET YAAMPUN ❤ ❤ ❤ dia JUGA PAKE STOCKING IMUT BANGET AAAAAAAAH KEQING LUCCUUUUUUUUUUUUUUU............ GUA BAKAL BAKAR DUIT 12 JUTA RUPIAH BUAT KEQING "

  const [buttonActive, setButtonActive] = useState(AKTIVASI);
  const [currentOption, setCurrentOption] = useState("informasi")
  const [informasiTampil, setInformasiTampil] = useState(false);
  const [hashTampil, setHashTampil] = useState(false);
  const [tambahanTampil, setTambahanTampil] = useState(false);

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
      console.log(buttonActive)
      console.log(currentOption)
  }

  useEffect(() => {
    currentOption === "informasi" ? setInformasiTampil(true) : setInformasiTampil(false)
    currentOption === "hash" ? setHashTampil(true) : setHashTampil(false)
    currentOption === "tambahan" ? setTambahanTampil(true) : setTambahanTampil(false)
  }, [currentOption]);

  return (
    <>
      <div className="main-container">
        <div className="left-container">
          <ul className="left-options">
            <li value="informasi" className={`horizontal-div ${buttonActive[0]}`} onClick={() => checkCurrentOption(0)}>Informasi</li>
            <li value="hash" className={`horizontal-div ${buttonActive[1]}`} onClick={() => checkCurrentOption(1)}>Hash</li>
            <li value="tambahan" className={`horizontal-div ${buttonActive[2]}`} onClick={() => checkCurrentOption(2)}>Tambahan</li>          
          </ul>
          <div className="left-description">
            {informasiTampil && isiInformsi}
            {hashTampil && isiHash}
            {tambahanTampil && isiTambahan}
          </div>
        </div>
        <div className="right-container">
          <div className="pop-verified">
            <img src={iconCheck} style={{width: 50}}/>
            <div>SERTIFIKAT TERFERIVIKASI</div>
            <div>Sertifikat diterbitkan oleh NAME OF ORGANIZATION dari TELKOM UNIVERSITY</div>
          </div>
          <div className="display-cert">
            <img src={certificate} className="display-cert-img"/>
          </div>
          <div className="scan-other">
            Scan Lainnya
            <img src={varrow} style={{width: 10, paddingLeft: 10}} />
          </div>
        </div>
      </div>
    </>
  );
    
}
