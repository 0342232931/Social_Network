import { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import HomePage from "../Home/HomePage";
import LoginPage from "../Login/LoginPage";
import RegisterPage from "../Register/Register";
import "./navbar.css";

function NavBar({children}){

  const user = useSelector((state) => state.auth.login.currentUser.result.userResponse)

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {`${user.firstName} ` + `${user.lastName}`}  </span> </p>
        <Link to="/logout" className="navbar-logout"> Log out</Link>
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
          </Routes>
    </nav>
  );
};

export default NavBar;
