import React, { Component } from 'react'
import Breakfast from '../Image/Breakfast.png';
import Lunch from '../Image/Lunch.png';
import Snacks from '../Image/Snacks.png';
import Dinner from '../Image/Dinner.png';
import Drinks from '../Image/Drinks.png';
import Nightlife from '../Image/Nightlife.png';
import {withRouter} from 'react-router-dom'
import { Link } from "react-router-dom";
 class QuickSearches extends Component {
    handleClick = () => {
       
        this.props.history.push('/Filter');
    }  
    render() {
        return (
            <div>
                <div class="Main">
                    <div><h1 class="QS">Quick Searches</h1></div>
                    <p class="D">Discover restaurants by type of meal</p>

                    <div class="row mt-3">
                        <div style={{ width: '360px' }} class="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center"  >
                            <Link to="/Filter"style={{textDecoration:"none" }}>
                            <div class="row">
                                <div class="col-6 px-0 mx-0">
                                    <img src={Breakfast} alt='Breakfast' class="card-img" />
                                </div>
                                <div class="col-6 px-3 py-3">
                                    <h3 class="card-title">Breakfast</h3>
                                    <p class="card-text">Start your day with exclusive breakfast options</p>
                                </div>
                            </div>
                            </Link>
                        </div>

                        <div style={{ width: '360px' }} class="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
                        <Link to="/Filter"style={{textDecoration:"none" }}>
                            <div class="row">
                                <div class="col-6 px-0 mx-0">
                                    <img src={Lunch} alt='Lunch' class="card-img" />
                                </div>
                                <div class="col-6 px-3 py-3">
                                    <h3 class="card-title">Lunch</h3>
                                    <p class="card-text">Recharge yourself with exciting lunch options</p>
                                </div>
                            </div>
                        </Link>
                        </div>

                        <div style={{ width: '360px' }} class="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
                        <Link to="/Filter"style={{textDecoration:"none" }}>
                            <div class="row">
                                <div class="col-6 px-0 mx-0">
                                    <img src={Snacks} alt='Snacks' class="card-img" />
                                </div>
                                <div class="col-6 px-3 py-3">
                                    <h3 class="card-title">Snacks</h3>
                                    <p class="card-text">Refresh your mood with amazing snacks options</p>
                                </div>
                            </div>
                            </Link>
                        </div>

                        <div style={{ width: '360px' }} class="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
                        <Link to="/Filter"style={{textDecoration:"none" }}>
                            <div class="row">
                                <div class="col-6 px-0 mx-0">
                                    <img src={Dinner} alt='Dinner' class="card-img" />
                                </div>
                                <div class="col-6 px-3 py-3">
                                    <h3 class="card-title">Dinner</h3>
                                    <p class="card-text">Complete your day with delicious dinner options</p>
                                </div>
                            </div>
                            </Link>
                        </div>

                        <div style={{ width: '360px' }} class="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
                        <Link to="/Filter"style={{textDecoration:"none" }}>
                            <div class="row">
                                <div class="col-6 px-0 mx-0">
                                    <img src={Drinks} alt='Drinks' class="card-img" />
                                </div>
                                <div class="col-6 px-3 py-3">
                                    <h3 class="card-title">Drinks</h3>
                                    <p class="card-text">Refresh your day with awesome cold drinks options</p>
                                </div>
                            </div>
                            </Link>
                        </div>

                        <div style={{ width: '360px' }} class="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
                        <Link to="/Filter"style={{textDecoration:"none" }}>
                            <div class="row">
                                <div class="col-6 px-0 mx-0">
                                    <img src={Nightlife} alt='Nightlife' class="card-img" />
                                </div>
                                <div class="col-6 px-3 py-3">
                                    <h3 class="card-title">Nightlife</h3>
                                    <p class="card-text">Enjoy special moments with your friends having healthy food</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default QuickSearches;