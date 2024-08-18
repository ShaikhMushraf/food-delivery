import React, { useState } from 'react'
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    const [checkOut, setCheckOut] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("")
      const navigate = useNavigate();

    const email = localStorage.getItem('userEmail');
    // console.log("Retrieved email:", email); // Debugging statement

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }


    const handleCheckOut = () => {
        setCheckOut(true);
    }

    const handleSubmitOrder = async () => {

        //     const email = localStorage.getItem('userEmail');
        //   if (!email) {
        //     alert("No user email found. Please log in again.");
        //     return;
        //   }

        try {
            // console.log("Form Values:", { name, address, number, email });
        // console.log("Cart Items:", data);
            let response = await fetch("http://localhost:5000/api/orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    items: data,
                    name: name,
                    address: address,
                    number: number
                })
            });
            // console.log("Response status:", response.status); 
            // const jsonResponse = await response.json();
            // console.log("Response JSON:", jsonResponse);

            if (response.status === 200 || response.status === 201 ) {
                alert("your Order will be delivered");
                navigate('/payment-gateway');
                dispatch({ type: "DROP" });

                setName("");
                setAddress("");
                setNumber("");
                setCheckOut(false);

            } else {
                alert("Failed to place order")
            }
        } catch (error) {
            console.error('error', error);
            alert("Error occurred while placing the order.");
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className="btn p-0">
                                        <Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    {!checkOut ? (
                        <button className='btn bg-success mt-5' onClick={handleCheckOut}>check Out</button>
                    ) : (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                className='m-3'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Enter your Address"
                                className='m-3'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Enter your Number"
                                className='m-3'
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />
                            <button className='btn bg-success mt-5' onClick={handleSubmitOrder}>Submit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}