import React, { Component } from 'react';
import WallPaper from '../Image/Wallpaper.png';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import Header from './Header';


const modalStyle={
    content:{
        backgroundColor:'orange',
        height:'500px',
        width: '500px',
        top:'auto',
        left:'30%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transfrom:'translate(-50%,-50%)'
    }
}

Modal.setAppElement('#root')



export default class Wallpaper extends Component {

    constructor(){
        super()
        console.log(" wallpaper constructor getting called...")
        this.state={
            locations:[],
            restaurants:[]
        }
  
      }
  
  
  
      componentDidMount(){
          
          //call my api 
          fetch('http://localhost:7878/zomato/locations',{method:'GET'})
          .then(response=>response.json())
          .then(data=> this.setState({locations:data.data}))
    
      }  
  
     
      fetchRestaurants = (event)=>{
          fetch(`http://localhost:7878/zomato/restaurants/${event.target.value}`,{method:'GET'})
          .then(response=>response.json())
          .then(data=> {this.setState({restaurants:data.data});console.log(data.data)})
  
          
      
      }

    render() {

        let locationOption = this.state.locations.length && this.state.locations.map((item)=><option key ={item.name} value={item.city_id}>{item.name}</option>)
        let restaurantsList = this.state.restaurants.length && <ul>{this.state.restaurants.map((item) =><li key={item.name}><Link to={`/restaurantDetails/${item.name}`}>{item.name}</Link></li>)}</ul>

              
        return (
            <div>
                <Header/>
                <div class="BG">
                    <img src={WallPaper} class="img_fluid" alt="Background"></img>
                </div>
                <header>
                    <div class="row text-end pt-4 login-signup-row">
                        <div class="col-2 col-md-6 col-lg-7"></div>
                        <div class="col-2 col-lg-2 pe-4 text-end">
                            {/* <button class="login" href="#" onClick={()=>setisloginModalOpen(true)}>Login</button> */}
                        </div>
                        <div class="col-8 col-md-4 col-lg-3 text-start">
                            {/* <button class="createacc px-2 py-2" href="#" onClick={()=>setisloginModalOpen(true)} >Create an account</button> */}
                        </div>
                    </div>
                </header>

                <div class="row pt-4 mx-auto text-center logo-row">
                    <div class="col-12">
                        <h1 class="px-4 py-3 px-md-4 py-md-2 logo">e!</h1>
                    </div>
                </div>

                <div class="row pt-4 mx-auto text-center title-row">
                    <div class="col-12">
                        <p class="title">Find the best restaurants, cafés, and bars</p>
                    </div>
                </div>

                <div class="row pt-4 mx-auto text-center search-bar-row">
                    <div class="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
                    <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-4">
                        <div class="locationSelector">
                            <select class="location px-2 py-3" onChange={this.fetchRestaurants}>
                                <option value="0">Please type a location</option>
                                {locationOption}
                            </select>
                        </div>
                    </div>

                    <div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="restaurantSelector">
                            <div class="restlist" >
                            <input class="restaurant ps-5 py-3" type="text" placeholder="Search for restaurants" />
                                    {restaurantsList}
                            </div>
                            <div class="search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search "
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>

                   
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
                </div>
            </div>
        )
    }
}
