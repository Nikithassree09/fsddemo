import React, { useState } from 'react'
import axios from 'axios'
function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/users/login', { email, password });
        console.log(response.data);
    } catch (error) {
      console.error('Failed to Login, try again.', error.response.data);
    }
  }
  return (
     <form onSubmit={(handleSubmit)}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
      </div>
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
      </div>
      <button type='submit'>Login</button>
     </form>
  )
}

export default login
