import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertSlice";
function Protectedroute(props) {
   const {user} = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const getUser=async()=>{
        try {
            dispatch(showLoading())
           const response = await axios.post('/api/users/profile',{token : localStorage.getItem('token')} , {
            headers: {
                Authorization : Bearer `${localStorage.getItem('token')}`
            }
           });
           dispatch(hideLoading());
           if (response.user.success) {
            dispatch(setUser(response.user.data));
           }else{
            localStorage.clear()
            navigate("/Login");
           }

        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear()
            navigate("/Login");
        }
   }
    useEffect(() => {
          if(!user) {
            getUser()
          }
    }, [user])
    if (localStorage.getItem("token")) {
        return props.children;
    } else {
        return <Navigate to="/Login" />;
    }
}
export default Protectedroute;