import React, { useRef, useEffect, useState } from "react";
import certificate from "../../assets/certificate2.png"
import varrow from "../../assets/varrow.png"
import infoIcon from "../../assets/icon_info_outline.png"
import Editor from '@toast-ui/editor';
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Generator from "../../components/Generator";
import axios from "axios";
import { getCookie } from "../../features/commonService";

export function Input() {
  const [searchparams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  const [editData, setEditData] = useState({});
  const dataEdit = null;

  const ID = searchparams.get("ID");
  console.log(`ID: ${ID}`);

  useEffect(() => {
    
    dispatch(getMe());
    // checkRoute();
    // getEditData();
  }, [dispatch]);

  // useEffect(() => {
  //   if(isError){
  //     navigate("/login");
  //   }
  // }, [isError]);
  
  useEffect(() => {
    editCheck();
  }, [])

  const editCheck = () => {
    if(ID){
      getEditData();
    }
  }

  const getEditData = async () => {
    const url = `https://hyperledger.seculab.space/home?args=["${ID}"]`;
    console.log("ALHAMDULILAH");
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setEditData(response.data);
      // return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("GAGAL");
        return message;
      }
    }
  };

  // const checkRoute = () => {
  //   if(ID==null){
  //     console.log('ori')
  //   }else if (typeof ID === "string") {
  //     console.log('edit')
  //   }
  // }
  
  // const Logo = searchparams.get("Logo");
  // const Acara = searchparams.get("Acara");
  // const Organisasi = searchparams.get("Organisasi");
  // const Nama = searchparams.get("Nama");
  // const Perihal = searchparams.get("Perihal");
  // const Deskripsi = searchparams.get("Deskripsi");
  // const Author1 = searchparams.get("Author1");
  // const Jabatan1 = searchparams.get("Jabatan1");
  // const TTD1 = searchparams.get("TTD1");
  // const Author2 = searchparams.get("Author2");
  // const Jabatan2 = searchparams.get("Jabatan2");
  // const TTD2 = searchparams.get("TTD2");
  // const Certificate = searchparams.get("Certificate");

  // const editData = {
  //   ID: ID,
  //   Logo: Logo,
  //   Acara: Acara,
  //   Organisasi: Organisasi,
  //   Nama: Nama,
  //   Perihal: Perihal,
  //   Deskripsi: Deskripsi,
  //   Author1: Author1,
  //   Jabatan1: Jabatan1,
  //   TTD1: TTD1,
  //   Author2: Author2,
  //   Jabatan2: Jabatan2,
  //   TTD2: TTD2,
  //  (inputRoute)  Certificate: Certificate
  // } 

  return (
    <Generator editData={editData}/>
  );
}
