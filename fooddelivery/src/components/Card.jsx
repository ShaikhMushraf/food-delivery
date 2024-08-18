import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart } from './ContextReducer';

function Card(props) {
    let dispatch = useDispatchCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOption = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    const handleAddToCart = async () => {
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.foodItem.img
        });
    };

    return (
        <div>
            <div className="card mt-3 mb-3" style={{ "width": "15rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                );
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOption.map((data) => {
                                return <option key={data} value={data}>{data}</option>;
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ${finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div className='btn bg-success justify-content-center mx-2' onClick={handleAddToCart}>Add To Cart</div>
                </div>
            </div>
        </div>
    );
}

export default Card;
