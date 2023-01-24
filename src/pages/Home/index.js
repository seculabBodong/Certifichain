import "../../components/Home.css";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import award from "../../assets/award1.png"

export function Home() {
  return (
    <>
      <div className="container">
        {/* <img src={award} style={{width : 200, position: "absolute"}}/> */}
        <div className="content">
          <div className="text-title">SELAMAT DATANG!</div>
            <div className="content-middle">
              <div>
                <div className="text-content">
                  Certifichain adalah web yang membantu anda verifikasi sertifikat dengan
                  mudah
                </div>
                <div className="get-started">
                  <Link to='/verify' style={{ textDecoration: 'none',color: "black"}}>Get Started</Link>
                </div>
              </div>
              <div className="input-container">
                <div className="input-container2">
                  <text>Scan Sertifikatmu</text>
                  <text>atau</text>
                  <div className="pilih-file">
                    <label for="upload-file">Pilih File</label>
                    <input type="file" name="photo" id="upload-file" />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
