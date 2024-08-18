import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


function Home() {
    
    const[search,setSearch] = useState('');
    const [foodCat,setFoodCat] = useState([]);
    const [foodItem,setFoodItem] = useState([]);

    const loadData = async ()=> {
        let response = await fetch("http://localhost:5000/api/FoodData", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setFoodItem(data.fooditems);
        setFoodCat(data.foodcategory);

    }


    useEffect(()=>{
        loadData()
    },[])


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important",height:"100%"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>

                    </div>
                    <div className="carousel-item active " >
                        <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..." style={{ backgroundcontain:"cover"}}/>
                    </div>
                    <div className="carousel-item" >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPSjdvxcwwWlJ20T9JOy58usctLaZYekJmIym7AEVLegAwV7j51yNY-8h7Ira8t5XLYWc&usqp=CAU" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgChXCyfA2w2sJ4K1yTXHvHRop6RuJ1n7y9c64WL6W3RVeP5OBY6221fdMmiQnjS9GA_k&usqp=CAU" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container'>
    {foodCat.length > 0 ? (
        foodCat.map((category) => {
            return (
                <div key={category._id} className='row mb-3'>
                    <div className='fs-3 m-3'>{category.CategoryName}</div>
                    <hr />
                    {foodItem.length > 0 ? (
                        foodItem
                            .filter((item) =>
                                item.CategoryName === category.CategoryName &&
                                item.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((filteredItem) => {
                                return (
                                    <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card foodItem= {filteredItem}
                                            options={filteredItem.options[0]}
                                        />
                                    </div>
                                );
                            })
                    ) : (
                        <div>No items available</div>
                    )}
                </div>
            );
        })
    ) : (
        <div>No categories available</div>
    )}
</div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home