import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HomePage from "../Home/HomePage";
import LoginPage from "../Login/LoginPage";
import RegisterPage from "../Register/Register";
import "./navbar.css";
import { logoutUsers } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";


function NavBar({children}){

  const user = useSelector((state) => state.auth.login.currentUser?.result.userResponse)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.login.currentUser?.result.token)

  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  const request = {
    token : token,
  }

  const handleLogout = () => {
    try{
      console.log(token);
      
      logoutUsers(token, dispatch, navigate, axiosJWT);
    } catch(err){
      console.log("msg error: " + err);
    }
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {`${user.firstName} ` + `${user.lastName}`}  </span> </p>
        <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
      <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path="/login" element={ <LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={ <LoginPage />} />
          </Routes>
    </nav>
  );
};

export default NavBar;
