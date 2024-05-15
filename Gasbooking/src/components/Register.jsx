import { Link, useNavigate } from 'react-router-dom'
import userServices from '../services/userServices';



const Register = () => {

    const navigate = useNavigate();
    
    const handleRegister = (e) => {
        e.preventDefault();
        const Username = e.target[0].value;
        const Email = e.target[1].value;
        const Password = e.target[2].value;
        const Location = e.target[3].value;
        userServices.register(Email, Password, Username, Location)
        .then(response => {
          e.target.reset();
          alert('Registration is successful');

          setTimeout(() => {
            navigate('/login');
          }, 500);
          })
        .catch(error => {
          alert('Registration is failed');
        });
        
      }
      const itemStyle = {
          marginBottom: '10px',
      }
      
  
    return (
      <>
    <form onSubmit={(handleRegister)}>
     <div className="m-3"><h2>Register</h2></div>
     <div className="col-auto m-3 col-md-3" style={itemStyle}>
    <label htmlFor="username" className="col-form-label">Username</label>
    <input type="username" className="form-control" id="username" aria-describedby="usernameHelp"></input>
    </div>
  <div className="col-auto m-3 col-md-3" style={itemStyle}>
    <label htmlFor="email" className="col-form-label">Email</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
    </div>
  <div className="col-auto m-3 col-md-3" style={itemStyle}>
    <label htmlFor="password" className="col-form-label">Password</label>
    <input type="password" className="form-control" id="password"></input>
  </div>
  <div className="col-auto m-3 col-md-3" style={itemStyle}>
    <label htmlFor="location" className="col-form-label">Location</label>
    <input type="location" className="form-control" id="location"></input>
  </div>
  <div className="m-3" style={itemStyle}><button type="submit" className="btn btn-primary">Submit</button></div>
</form>

   <br />
   <div className=" col-auto m-6 gap-2"><p>Already have an account? <Link to="/login">Login</Link></p></div>
   </>
  )
}


export default Register
