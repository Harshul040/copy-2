import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.png"
import { AuthContext } from "../context/authContext.jsx";
import { useContext, useState } from "react";
const Navbar = () => {
  const {currentUser,logout} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt=''/>
          </Link>
          
        </div>
        <div className="links">
          <Link className='link' to="/?cat=software">
          <h6>SOFTWARE</h6>
          </Link>
          <Link className='link' to="/?cat=consulting">
          <h6>CONSULTING</h6>
          </Link>
          <Link className='link' to="/?cat=finance">
          <h6>FINANCE</h6>
          </Link>
          <Link className='link' to="/?cat=quant">
          <h6>QUANT</h6>
          </Link>
          <Link className='link' to="/?cat=analytics">
          <h6>ANALYTICS</h6>
          </Link>
          <Link className='link' to="/?cat=core">
          <h6>CORE</h6>
          </Link>
          <span> <b>{currentUser?.username}</b></span>
          {currentUser ? (<span onClick={logout}>Logout</span>) : (<Link className="link" to="/login">Login</Link>)}
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
        </div>
        </div>
  )
}

export default Navbar