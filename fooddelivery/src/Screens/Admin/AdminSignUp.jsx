import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignUp() {
  const [credentials, setCredentials] = useState({ email: '', password: '', city: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/adminsignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        city: credentials.city
      })
    });
    const json = await response.json();
    if (json.success) {
      navigate('/admin-signin');
    } else {
      alert('Sign up failed');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
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
        <div className="mb-3">
          <label htmlFor="adminCity" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="adminCity"
            name='city'
            value={credentials.city}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignUp;
