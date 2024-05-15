import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('');
    const [location, setlocation] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/register', { email, password, username, location });
            console.log(response.data);

            navigate('/login');
        } catch (error) {
          console.error('Failed to register, try again.', error.response.data);
        }
      }
      
  
    return (
    <form onSubmit={(handleSubmit)}>
     <h2>Register</h2>
     <div>
      <label>Username</label>
      <input type='username' value={username} onChange={(e) => setusername(e.target.value)} required></input>
    </div>
    <div>
      <label>Email</label>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
    </div>
    <div>
      <label>Password</label>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
    </div>
    <div>
      <label>Location</label>
      <input type='Location' value={location} onChange={(e) => setlocation(e.target.value)} required></input>
    </div>
    <button type='submit'>Register</button>
   </form>
  )
}

export default Register
