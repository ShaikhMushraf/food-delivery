import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessfulPayment.css'; // Optional: Create a CSS file for styling

export default function SuccessfulPayment() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Redirect to the home page or any other page
    };

    return (
        <div className="success-container">
            <div className="success-box">
                <h1>Payment Successful!</h1>
                <p>Your payment was processed successfully. Thank you for your purchase!</p>
                <button className="home-button" onClick={handleGoHome}>
                    Go to Home
                </button>
            </div>
        </div>
    );
}
