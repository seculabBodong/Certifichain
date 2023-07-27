import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export async function getUser(){
    console.log("MANTAP");
    try {
      const response = await axios.get(`https://backend.seculab.space/users`);
      const userList = response.data;
      const filterApprove = userList.filter(
        (resp) => resp.status == "approved"
      );
      const userApprove = filterApprove;
      const filterNotApprove = userList.filter(
        (resp) => resp.status == "not_approved"
      );
      const userNotApprove = filterNotApprove;
      return [userApprove, userNotApprove];
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("OH NO");
        return message;
      }
    }
  };

export async function handleApprove (uid){
    console.log("ALHAMDULILAH");
    try {
      const response = await axios.patch(`https://backend.seculab.space/users/${uid}`,
      {
        status: "approved"
      });
      window.location.reload(false);
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("GAGAL");
        return message;
      }
    }
  };

  export async function handleNotApprove (uid, currUid){
    console.log("ALHAMDULILAH");
    try {
        if(uid !== currUid){
            const response = await axios.patch(`https://backend.seculab.space/users/${uid}`,
            {
                status: "not_approved"
            });
            window.location.reload(false);
        }else{
            return alert("tidak bisa mengubah status sendiri")
        }
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log("GAGAL");
        return message;
      }
    }
  };