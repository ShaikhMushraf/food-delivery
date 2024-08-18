import React,{ useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


function Login() {

  const [credentials, setCredentials] = useState({email:"",password:"",})
  let navigate = useNavigate()


const handleSubmit= async (e)=> {
    e.preventDefault();
    // console.log("Submitting with credentials:", credentials);
    const response = await fetch("http://localhost:5000/api/loginuser",{
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body:JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
    });
    const json = await response.json();
    // console.log(json);

    if (!json.success) {
        alert("Enter Valid Credentials")
    }  
    if (json.success) {
      localStorage.setItem("authToken",json.authToken);
      localStorage.setItem("userEmail", credentials.email);
// console.log("User email set in localStorage:", localStorage.getItem("userEmail"));
      navigate("/");
  } 
};

const onChange = (event) => {
  // console.log("Input changed:", event.target.name, event.target.value);
  setCredentials({ ...credentials, [event.target.name]: event.target.value });
};


  return (
    <div>
      <div className='container'>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <Link to="/admin-signin" className='btn btn-warning'>Sign in as Admin</Link>
        </div>
   <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'> New User </Link>
</form>
</div>
    </div>
  )
}

export default Login