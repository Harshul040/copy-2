import React from 'react'
import axios from "./authConfig";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });   

  const [err, setError] = useState(null);
  const navigate =useNavigate();
  const {login} = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
   console.log(inputs)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with inputs:", inputs);

    try {
      await login(inputs);
        //await axios.post("http://localhost:8800/api/auth/login", inputs);
        navigate("/");

        
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setError(err.response.data);
    }
};
  return (
    <div className="auth">
    <h1>Login</h1>
    <form>
    <input required type="text" placeholder="username" name="username" onChange={handleChange} />
                <input required type="password" placeholder="password" name="password" onChange={handleChange} />
                <button onClick={handleSubmit}>Login</button>
                {err&&<p>{err}</p>}

      <span >Don't have an account? <br />
        <Link to = "/register">Register</Link> </span> 
    </form>
    </div>
  )
}

export default Login