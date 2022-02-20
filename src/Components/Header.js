import React, { useState } from 'react'
import '../styles/Header.css'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const modalStyle={
    content:{
        backgroundColor:'white',
        height:'500px',
        width: '550px',
        top:'auto',
        left:'30%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transfrom:'translate(-50%,-50%)'
    }
}

Modal.setAppElement('#root')

export default function Header() {
    const [isloginModalOpen, setisloginModalOpen]= useState(false)
    const [isCaaModalOpen, setisCaaModalOpen]= useState(false)
    const [username, setisusernameOpen]= useState("")
    const googleLogin = (response) => {
        setisusernameOpen(response.profileObj.givenName);
        setisloginModalOpen(false);
      };
    return (
        <div class="nav" >
            <div id="fb-root"></div>
            {/* <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v12.0" nonce="unzn14sd"></script> */}
            <div >
            {username == "" ? (
          <button id="log" onClick={() => setisloginModalOpen(true)}>
            Login
          </button>
        ) : (
          <button id="log">{username}</button>
        )}
                <button id="caa" onClick={()=>setisCaaModalOpen(true)}>create an account</button>
            </div>
            <Modal isOpen={isloginModalOpen} style={modalStyle}>
                <h2>
                    <h1 align='left' >login</h1>
                    
                    <button id='X' onClick={()=>setisloginModalOpen(false)} className='btn btn-outline-danger float-end' >X</button>
                     <br></br>

                    <input className='Email' type={'email'} placeholder='Enter your Email Address' ></input>
                    <input className='Password' type={'password'} placeholder='Enter your Password' ></input>
                    <br></br><br></br>

                    {/* <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
                    <label class="f" >f</label>
                    <FacebookLogin
                    appId='1122816148481479'
                    autoLoad={true}
                    textButton='Continue With Facebook'
                    /><br></br><br></br>
                    <GoogleLogin
                    clientId="291146420474-m98814sbgt8ju1jhcvprkj4msvluih50.apps.googleusercontent.com"
                    buttonText='Continue With Google'
                    onSuccess={googleLogin}
                    onFailure={googleLogin}
                    />
                </h2>
                <br></br>
                <label align="center">Don't have an account?<button class="CL" onClick={()=>{setisCaaModalOpen(true);setisloginModalOpen(false)}} >Create Account</button></label> 
            </Modal>
            
            <Modal isOpen={isCaaModalOpen} style={modalStyle}>
                <h2>
                    <h1 align='left' >Create an Account</h1>
                    
                    <button id='X' onClick={()=>setisCaaModalOpen(false)} className='btn btn-outline-danger float-end' >X</button>
                    <br></br>

                    
                    <input className='Email' type={'email'} placeholder='Enter your Email Address' ></input>
                    <input className='Password' type={'password'} placeholder='Create Password' ></input>
                    <br></br><br></br>
                    {/* <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
                    <label class="f" >f</label>
                    <FacebookLogin
                    
                    appId='1122816148481479'
                    autoLoad={true}
                    textButton='Continue With Facebook'
                    />
                    <br></br><br></br>
                    <GoogleLogin
                    clientId='291146420474-m98814sbgt8ju1jhcvprkj4msvluih50.apps.googleusercontent.com
                    '
                    buttonText='Continue With Google'
                    onSuccess={googleLogin}
                    onFailure={googleLogin}
                    />
                </h2>
                <br></br>
                 <label align="center">Have account?<button class="CL" onClick={()=>{setisCaaModalOpen(false);setisloginModalOpen(true)}} >LogIn</button></label>
            </Modal>

            <div class="e" >
                <h1 id="e" >e!</h1>
            </div>
        </div>

    )
}
