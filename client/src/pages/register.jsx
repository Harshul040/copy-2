import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./authConfig";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate =useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
   console.log(inputs)
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with inputs:", inputs);

    try {
        //const res = await axios.post("/auth/register", inputs);
        await axios.post("http://localhost:8800/api/auth/register", inputs);
        navigate("/login");

        //console.log("Response:", res.data);
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setError(err.response.data);
    }
};


  return (
    <div className="auth">
    <h1>Register</h1>
    <form>
      <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
      <input  required type="email" placeholder='email' name='email' onChange={handleChange}/>
      <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
      <button onClick={handleSubmit}>Register</button>
      {err && <p>{err}</p>}
     
    </form>
    </div>
  )
}

export default Register;