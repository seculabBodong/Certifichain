import React, { useRef } from "react";
import "../../components/Input.css"
import certificate from "../../assets/certificate2.png"
import varrow from "../../assets/varrow.png"
import infoIcon from "../../assets/icon_info_outline.png"
import Editor from '@toast-ui/editor';
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";

export function Input() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://uicdn.toast.com/tui-image-editor/latest/tui-image-editor.css"
      />
      <script src="https://uicdn.toast.com/tui-image-editor/latest/tui-image-editor.js"></script>
      <div className="main-container">
      <div id="tui-image-editor"></div>
        <div className="left-contain">
          <div className="template-contain">
            Pilih Template :
            <img src={certificate} className="template-img"/>
          </div>
          <div className="left-options">
          </div>
        </div>
        <div className="right-contain">
          <div className="header-contain">
            <div className="back-contain">
              <img src={varrow} className="arrow-back rotateimg180" />
              Kembali
            </div>
            <div className="text-judul">
                MEMBUAT SERTIFIKAT
            </div>
          </div>
            <div className="judul-input">
                Nama Acara
                <input type="text" className="text-input"/>
            </div>
            <div className="judul-input">
                Perihal
                <label>
                  <select className="input-perihal">
                    <option value="fruit">Webinar</option>
                    <option value="vegetable">Pelatihan</option>
                    <option value="meat">Apresiasi</option>
                  </select>
                </label>
            </div>
            <div className="input-nama-container">
              <div className="judul-input">
                <label>
                  <input type="radio" checked="checked"/>Nama Kandidat
                  <span class="checkmark"></span>
                </label>
                <input type="text" className="text-input-half"/>
              </div>
              <div className="judul-input">
                <label>
                  <input type="radio" checked="checked"/>Input Jumlah Besar
                  <span class="checkmark"></span>
                </label>
                <div className="input-logo-desc">
                  <div className="input-logo-container">
                    <label for="upload-logo">Pilih File</label>
                    <input type="file" name="photo" id="upload-logo" />
                  </div>
                </div>
              </div>
              <img src={infoIcon} className="info-icon"/>
            </div>
            <div className="judul-input">
                Deskripsi
                <textarea type="text" className="text-input input-desc"/>
            </div>
            <div className="input-logo">
                Logo
                <div className="input-logo-desc">
                  <div className="input-logo-container">
                    <label for="upload-logo">Pilih Logo</label>
                    <input type="file" name="photo" id="upload-logo" />
                  </div>
                  minimum size 3mb, PNG
                </div>
            </div>
            <div className="horizontal-divider"></div>
                <div className="input-pihak-container">
                  <div className="judul-input" style={{alignSelf: "center"}}>
                    Pihak 1
                  </div>
                  <div className="pihak-container-bottom">
                  <div className="judul-input">
                      Nama
                      <input type="text" className="text-input-half"/>
                  </div>
                  <div className="judul-input">
                      Tanda Tangan
                      <div className="input-logo-container">
                        <label for="upload-logo">Pilih File</label>
                        <input type="file" name="photo" id="upload-logo" />
                      </div>
                  </div>
                  </div>
                </div>
        </div>
      </div>
    </>
  );
}
