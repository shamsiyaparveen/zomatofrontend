import React from 'react'
import '../styles/Filter.css'
import Header from './Header'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


export default function Filter() {

    const [locations, setLocations] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [restaurantList, setRestaurantList] = useState([])
    const [filter, setFilter] = useState({
        city_id: '',
        cuisine: [],
        lcost: '',
        hcost: '',
        sort: 1
    })
    const [pageCount, setPageCount] = useState(0)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)
    }

    //call API
    useEffect(() => {
        fetch(`https://zomatobackend123.herokuapp.com/zomato/restaurants/filter/${currentPage}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRestaurantList(data.data)
                setPageCount(data.totalRecords / 2)

            })
    }
        , [filter, currentPage])


    useEffect(() => {
        //call api for locations:
    }, [])

    const handleCuisineChange = (event) => {
        if (event.target.checked)
            filter.cuisine.push(event.target.name)
        else {
            let index = filter.cuisine.indexOf(event.target.name)
            if (index > -1)
                filter.cuisine.splice(index, 1)
        }
        setFilter({ ...filter })

    }


    const handleCostChange = (lcost, hcost) => {
        filter.lcost = lcost;
        filter.hcost = hcost;
        setFilter({ ...filter })
    }

    const handleSort = (s) => {
        filter.sort = s;
        setFilter({ ...filter })
    }

    const paginationItems = []
    for (let i = 1; i <= pageCount; i++) {
        paginationItems[i] = <a href="#" onClick={() => setCurrentPage(i)}>{i}</a>
    }





    return (
        <div>
            <Header />
            <span class="BPIM" >Breakfast Places In Mumbai</span>
            <div class="menu" >
                <h1>Filters</h1>
                <h3>Select Location</h3>
                <select name='Select Location' id="sel" >
                    <option value="Select Location" selected disabled > Select location </option>
                    <option value="Borivali">Borivali</option>
                    <option value="Bandra">Bandra</option>
                    <option value="Andheri">Andheri</option>
                    <option value="Dahisar">Dahisar</option>
                </select>

                <h3>Cuisine</h3>
                <input class="inputs" type="checkbox" name="North Indain" onChange={(e) => handleCuisineChange(e)} ></input>North Indian<br></br><br></br>
                <input class="inputs" type="checkbox" name="South Indian" onChange={(e) => handleCuisineChange(e)}></input>South Indian<br></br><br></br>
                <input class="inputs" type="checkbox" name="Chinese" onChange={(e) => handleCuisineChange(e)}></input>Chinese<br></br><br></br>
                <input class="inputs" type="checkbox" name="Fast Food" onChange={(e) => handleCuisineChange(e)}></input>Fast Food<br></br><br></br>
                <input class="inputs" type="checkbox" name="Street Food" onChange={(e) => handleCuisineChange(e)}></input>Street Food<br></br><br></br>

                <h3>Cost For Two</h3>
                <input class="inputs" type="radio" name="cost" onChange={() => handleCostChange(1, 500)} ></input> Less than ₹ 500<br></br><br></br>
                <input class="inputs" type="radio" name="cost" onChange={() => handleCostChange(500, 1000)} ></input> ₹ 500 to ₹ 1000<br></br><br></br>
                <input class="inputs" type="radio" name="cost" onChange={() => handleCostChange(1000, 1500)} ></input> ₹ 1000 to ₹ 1500<br></br><br></br>
                <input class="inputs" type="radio" name="cost" onChange={() => handleCostChange(1500, 2000)} ></input> ₹ 1500 to ₹ 2000<br></br><br></br>
                <input class="inputs" type="radio" name="cost" onChange={() => handleCostChange(2000, 10000)} ></input> ₹ 2000+<br></br><br></br>
                <input class="inputs" type="radio" name="cost" onChange={() => handleCostChange(1, 10000)} ></input> All<br></br><br></br>

                <h3>Sort</h3>
                <input class="inputs" type="radio" name="sort" checked={filter.sort == 1} onChange={() => handleSort(1)} ></input> Price Low to High<br></br><br></br>
                <input class="inputs" type="radio" name="sort" checked={filter.sort == -1} onChange={() => handleSort(-1)} ></input> Price High to Low<br></br><br></br>

            </div>

            <div className="food">
                {
                    restaurantList.length > 0 ? restaurantList.map((item) =>
                    <Link to={`/restaurantDetails/${item.name}`} style={{textDecoration:"none" }}>
                        <div className="Item" >
                            <div className="row pl-1">
                                <div className="col-sm-4 col-md-4 col-lg-4">
                                    <img className="img" src={require('../Image/Breakfast.png')} />
                                </div>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <div className="BCC">{item.name}</div>
                                    <div className="F">{item.locality}</div>
                                    <div className="S">{item.city_name}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="row padding-left">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <div className="rest-address">CUISINES : {item.Cuisine.length && item.Cuisine.map((item) => item.name + ' ')}</div>
                                    <div className="rest-address">COST FOR TWO : {item.cost} </div>
                                </div>
                            </div>
                        </div>
                        </Link>

                    ) : <div className="noData" align="center" > No Data Found</div>
                }

            </div>
            <div>
                <div className="pagination">
                    <a href="#">&laquo;</a>
                    {paginationItems}
                    <a href="#">&raquo;</a>
                </div>
            </div>


        </div>
    )
}
