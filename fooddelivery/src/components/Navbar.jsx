import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from 'react-bootstrap';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../Screens/Cart';

function Navbar() {
  const [cartView, setCartView] = useState(false);

  localStorage.setItem('temp', "first")

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token')

  navigate("/login")
}

const loadCart = () => {
  setCartView(true)
}

const items = useCart();
const totalItems = items.reduce((total, item) => total + item.qty, 0);

  return (
    <>
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Foodie!</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link  active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        
        {(localStorage.getItem("authToken")) ?
        <li className='nav-item'>
          <Link className='nav-link active fs-5' aria-current='page' to="/">my Orders</Link>
        </li>:""}
      </ul>

      {(!localStorage.getItem("authToken")) ?
      <div className='d-flex'>
          <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
        
      </div>:
      <div>
       <div className="btn bg-white text-success mx-2 " onClick={()=>{setCartView(true)}}>My Cart { " "}
                                    <Badge pill bg="danger" > 
                                    {totalItems} <ShoppingCartIcon />
                                    </Badge>
                                </div>
       {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
       <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>logout</div> 
       </div>
       }
    </div>
  </div>
</nav>
    </div>
    </>
  )
};

export default Navbar;