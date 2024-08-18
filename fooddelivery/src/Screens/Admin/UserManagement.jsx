import React, { useEffect, useState } from 'react';

function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the backend API
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users'); // Adjust the URL as needed
                const data = await response.json();
                if (data.success) {
                    setUsers(data.users); // Assuming the response contains an array of users
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">User Management</h1>
            <p className="mb-4">Manage users here.</p>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}> {/* Use a unique key */}
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.location}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;
