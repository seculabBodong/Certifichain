import React, { useRef, useEffect } from "react";
import certificate from "../../assets/certificate2.png"
import varrow from "../../assets/varrow.png"
import infoIcon from "../../assets/icon_info_outline.png"
import Editor from '@toast-ui/editor';
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Generator from "../../components/Generator";

export function Input() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/login");
    }
  }, [isError, navigate]);
  
  return (
    <Generator/>
  );
}
