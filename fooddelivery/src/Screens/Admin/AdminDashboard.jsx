import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <ul>
                    <li><Link to="/admin/home">Home</Link></li>
                    <li><Link to="/admin/users">User Management</Link></li>
                    <li><Link to="/admin/orders">Order Management</Link></li>
                    <li><Link to="/admin/settings">Settings</Link></li> 
                </ul>
            </div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminDashboard;




