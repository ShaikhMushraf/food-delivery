import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/adminsignin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('adminToken', json.authToken);
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSignUp = () => {
    navigate('/admin-signup');
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="adminEmail" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="adminEmail"
            name='email'
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adminPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="adminPassword"
            name='password'
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">Sign In</button>
        <button type="button" className="m-3 btn btn-primary" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignIn;
