import React, { useEffect, useState } from 'react';

function OrderManagement() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from the backend API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders'); // Adjust the URL as needed
                const data = await response.json();
                // console.log("Fetched Orders Data:", data);
                if (data.success) {
                    setOrders(data.orders || []); // Ensure orders is always an array
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Order Management</h1>
            <p className="mb-4">Manage orders here.</p>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Items</th>
                            <th>Address</th>
                            <th>Number</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>
                                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                            {(order.items || []).map((item, index) => ( // Ensure items is an array
                                                <li key={index} className="mb-2">
                                                    <div><strong>Name:</strong> {item.name}</div>
                                                    <div><strong>Qty:</strong> {item.qty}</div>
                                                    <div><strong>Size:</strong> {item.size}</div>
                                                    <div><strong>Price:</strong> ${item.price.toFixed(2)}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{order.address}</td>
                                    <td>{order.number}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderManagement;
