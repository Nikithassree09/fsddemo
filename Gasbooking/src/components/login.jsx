import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import userServices from '../services/userServices';
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    userServices.login(email, password)
    .then(response => {
      e.target.reset();
      alert('Login  is successful');

      setTimeout(() => {
        navigate('/dashboard');
      },500);
    })
    .catch(error => {
      alert('Login failed');
    });
  }
  return (
      <>
       <div className="m-3"><h2>Login</h2></div>
      <form onSubmit={(handleLogin)}>
        <div className="row g-3 align-items-center">
  <div className="col-auto col-md-3 m-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
  <div className="col-auto">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"></input>
  </div>
  <div className="m-2"><button type="submit" className="btn btn-primary">Submit</button></div>
  </div>
  </div>
<br/>
<p>Don't have an account? <Link to="/register">Register</Link></p>
</form>
</>
  )
}

export default Login
