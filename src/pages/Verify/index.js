import "../../components/Verify.css";
import iconCheck from "../../assets/icon_checkmark.png"
import certificate from "../../assets/certificate2.png"
import varrow from "../../assets/varrow.png"
import { useState } from "react";

const STYLES = ["horizontal-div", "no-horizontal-div"];

//const [buttonActive, setButtonActive] = useState[0]

export function Verify() {
  return (
    <>
      <div className="main-container">
        <div className="left-container">
          <ul className="left-options">
            <li className={`${STYLES[0]}`}>Informasi</li>
            <li>Hash</li>
            <li>Tambahan</li>          
          </ul>
          <div className="left-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing. At volutpat diam ut venenatis tellus in metus vulputate. Libero justo laoreet sit amet cursus sit amet. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Amet consectetur adipiscing elit ut aliquam. Blandit libero volutpat sed cras ornare arcu. Gravida arcu ac tortor dignissim convallis aenean et tortor at. At elementum eu facilisis sed odio morbi quis commodo odio. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Tortor at auctor urna nunc id. Aenean et tortor at risus viverra.
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
