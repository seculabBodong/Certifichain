import React, { useRef, useEffect, useState } from "react";
import "../../components/Input.css";
import certificate from "../../assets/certificate2.png";
import varrow from "../../assets/varrow.png";
import infoIcon from "../../assets/icon_info_outline.png";
import Editor from "@toast-ui/editor";
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

export function Input() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [certID, setCertID] = useState("");
  const [acara, setAcara] = useState("");
  const [namaOrg, setNamaOrg] = useState("Organisasi pertahanan");
  const [kandidat, setKandidat] = useState("");
  const [perihal, setPerihal] = useState("Webinar");
  const [deskripsi, setDeskripsi] = useState("");
  const [ttd1, setttd1] = useState("sduUkY7iJo0sum1du==");
  const [ttd2, setttd2] = useState("asdf823mdyhu802as==");
  const [imageEnc, setImageEnc] = useState("suc8Oh3k9kks9H==");

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setPerihal(event.target.value);
  };

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

  console.log(getCookie("myCookie"));

  const handleInput = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/channels/mychannel/chaincodes/basic`,
        {
          fcn: "CreateAsset",
          peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
          chaincodeName: "basic",
          channelName: "mychannel",
          args: [
            "",
            acara,
            namaOrg,
            kandidat,
            perihal,
            deskripsi,
            ttd1,
            ttd2,
            imageEnc,
          ],
        },
        {
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${getCookie("myCookie")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("GAGAL");
        return message;
      }
    }
  };

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
            <img src={certificate} className="template-img" />
          </div>
          <div className="left-options"></div>
        </div>
        <div className="right-contain">
          <div className="header-contain">
            <div className="back-contain">
              <img src={varrow} className="arrow-back rotateimg180" />
              Kembali
            </div>
            <div className="text-judul">MEMBUAT SERTIFIKAT</div>
          </div>
          <form className="form" onSubmit={handleInput}>
            <div className="judul-input">
              Nama Acara
              <input
                type="text"
                className="text-input"
                name="acara"
                value={acara}
                onChange={(e) => setAcara(e.target.value)}
              />
            </div>
            <div className="judul-input">
              Perihal
              <label>
                <select
                  className="input-perihal"
                  value={perihal}
                  onChange={handleChange}
                >
                  <option value="Webinar">Webinar</option>
                  <option value="Pelatihan">Pelatihan</option>
                  <option value="Apresiasi">Apresiasi</option>
                </select>
              </label>
            </div>
            <div className="input-nama-container">
              <div className="judul-input">
                <label>
                  <input type="radio" checked="checked" />
                  Nama Kandidat
                  <span class="checkmark"></span>
                </label>
                <input
                  type="text"
                  className="text-input-half"
                  name="kandidat"
                  value={kandidat}
                  onChange={(e) => setKandidat(e.target.value)}
                />
              </div>
              <div className="judul-input">
                <label>
                  <input type="radio" checked="checked" />
                  Input Jumlah Besar
                  <span class="checkmark"></span>
                </label>
                <div className="input-logo-desc">
                  <div className="input-logo-container">
                    <label for="upload-logo">Pilih File</label>
                    <input type="file" name="photo" id="upload-logo" />
                  </div>
                </div>
              </div>
              <img src={infoIcon} className="info-icon" />
            </div>
            <div className="judul-input">
              Deskripsi
              <textarea
                type="text"
                className="text-input input-desc"
                name="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
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
              <div className="judul-input" style={{ alignSelf: "center" }}>
                Pihak 1
              </div>
              <div className="pihak-container-bottom">
                <div className="judul-input">
                  Nama
                  <input type="text" className="text-input-half" />
                </div>
                <div className="judul-input">
                  Tanda Tangan
                  <div className="input-logo-container">
                    <label for="upload-logo">Pilih File</label>
                    <input type="file" name="photo" id="upload-logo" />
                  </div>
                </div>
              </div>
              <div className="formFieldButtoms">
                <button type="submit" className="formFieldButton" style={{}}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
