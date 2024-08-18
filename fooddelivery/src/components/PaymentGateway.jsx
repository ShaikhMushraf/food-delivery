import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentGateway.css';  // Importing the CSS file

export default function PaymentGateway() {
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [errors, setErrors] = useState({});

    const handleCardNumberChange = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        input = input.substring(0, 16); // Limit to 16 digits

        // Add space after every 4 digits
        const formattedCardNumber = input.replace(/(\d{4})(?=\d)/g, '$1 ');

        setCardNumber(formattedCardNumber);
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate Card Number (simple check for 16 digits ignoring spaces)
        const cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Remove spaces
        if (!/^\d{16}$/.test(cleanedCardNumber)) {
            newErrors.cardNumber = 'Card number must be 16 digits.';
        }

        // Validate Cardholder Name (cannot be empty)
        if (!cardName.trim()) {
            newErrors.cardName = 'Cardholder name cannot be empty.';
        }

        // Validate Expiry Date (MM/YY format and must be in the future)
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            newErrors.expiryDate = 'Expiry date must be in MM/YY format.';
        } else {
            const [month, year] = expiryDate.split('/');
            const currentDate = new Date();
            const expiry = new Date(`20${year}`, month - 1);
            if (expiry < currentDate) {
                newErrors.expiryDate = 'Expiry date must be in the future.';
            }
        }

        // Validate CVV (3 or 4 digits)
        if (!/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'CVV must be 3 or 4 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = () => {
        if (validateForm()) {
            alert('Payment Successful!');
            navigate('/payment-success'); 
        } else {
            alert('Please correct the errors in the form.');
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-box">
                <h1>Payment Gateway</h1>
                <p>Please enter your card details to proceed with the payment.</p>

                <div className="input-group">
                    <div className="input-with-icon">
                        <i className="fa fa-credit-card"></i>
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="input-field"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            required
                        />
                        {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    

                    <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="input-field"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                    />
                    {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                    </div>

                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="Expiry Date (MM/YY)"
                            className="input-field small"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                        {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}

                        <input
                            type="text"
                            placeholder="CVV"
                            className="input-field small"
                            value={cvv}
                            onChange={(e) => setCVV(e.target.value)}
                            required
                        />
                        {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                    </div>
                </div>

                <button className="pay-button" onClick={handlePayment}>
                    Pay Now
                </button>
            </div>
        </div>
    );
}
