import React from 'react'

function Carousal() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important",height:"100%"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>

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
    )
}

export default Carousal