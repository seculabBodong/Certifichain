import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

export function Dashboard(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [aset, setAset] = useState([]);
    const {isError} = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    
    const getAsset = async () => {
        console.log("ALHAMDULILAH");
        try {
            const response = await axios.get('http://localhost:4000/home?args=[]&peer=peer0.org1.example.com&fcn=GetAllAssets', {withCredentials: false, headers: { 
                Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY5MDcyNzYsInVzZXJuYW1lIjoidGVzdF91c2VyMyIsIm9yZ05hbWUiOiJPcmcxIiwiaWF0IjoxNjc2ODcxMjc2fQ.yzkE9ZxUkVNDl_cAzDRJxIP_vJTiguyEf4fSmTghpyk'
              }});
            // console.log(response.data);
            setAset(response.data);
            console.log(response.data);
            return response.data
        } catch (error) {
            if(error.response){
                const message = error.response.data.msg;
                console.log("AMJING");
                return message;
            }
        }
    }

    return(
        <>
            <div>
                {aset.map((data)=>{
                    return(<li>
                        {data.ID}
                    </li>)
                })}
                <button onClick={getAsset}>oke</button>
            </div>
        </>
    );
}