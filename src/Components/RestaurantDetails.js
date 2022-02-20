import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Details.css' 
import Modal from 'react-modal'

Modal.setAppElement('#root')

const modalStyle={
    overlay: {
        position: 'fixed',
        zIndex: 1020,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    content:{
        left:'auto',
        right:'auto',
        width:'auto',
        tranform:'translate(-50%,-50%)'
    }
}


export default function RestaurantDetails() {

    const{rName}=useParams()
    const[restaurant,setRestaurant]=useState({})
    const [menu, setMenu] = useState([])
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [isUserDModalOpen, setIsUserDModalOpen] = useState(false)
    const [user, setUser] = useState({name:'',email:'',contact:0})


const addItem=(item)=>{
   let price=totalPrice + item.itemPrice;
   console.log("price",price)
   setTotalPrice(price);
   console.log(totalPrice)
}


const subItem=(item)=>{
    let price=totalPrice - item.itemPrice;
    
    console.log("price",price)
    setTotalPrice(price);
    console.log(totalPrice)
 }


const openRazorPay=async ()=>{
    try{
        let data ;
       data = await fetch("https://zomatobackend123.herokuapp.com/pay/razorpay", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({amount:totalPrice})
          }).then((t) => t.json());
        
          console.log(data);
    
    
    
      const options = {
        key: "rzp_test_hVcMlscbbvUn0g",
        currency: data.currency,
        amount: data.amount,
        name: "Zomato-Food Delivery",
        description: "Wallet Transaction",
        order_id: data.id,
        handler: function (response) {
            var values ={
                razorpay_signature : response.razorpay_signature,
                razorpay_order_id : response.razorpay_order_id,
                transactionid : response.razorpay_payment_id,
                transactionamount : data.amount,
              }
            
              fetch("https://zomatobackend123.herokuapp.com/pay/transaction", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(values)
              }).then(resp=>{console.log(resp); })
                .catch(e=>console.log("error occured during saving transaction",e))
           
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact,
          address: user.address,
        },
      };
    
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }catch(e){
        console.log("error occured:",e)
    }

}

const handleUserchange=(e)=>{
    user[e.target.name]=e.target.value
    setUser({...user})
}

const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };





    useEffect(() => {
        fetch(`https://zomatobackend123.herokuapp.com/zomato/restaurantDetails/${rName}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>setRestaurant(data.data))
        

        fetch(`https://zomatobackend123.herokuapp.com/zomato/menu/${rName}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>{setMenu(data.data);console.log("menu:",menu)})
        }
    , [])
    
    
    const{name,thumb,cost,address,Cuisine}=restaurant
    const cuisineValues= !(Cuisine==undefined ) && Cuisine.length && Cuisine.map((item)=><div class="value">{item.name}</div>)
    return (
        <div>
        <div>
            {/* Showcasing the First Image and rest will be showed in the Carousal  */}
            <img class="Imge" src={thumb} width="100%" height="500px" />
            {/* <button class="gallery-button">Click to see Image </button> */}
            <a class="gallery-button" href={thumb} >Click to see Image </a>
        </div>
        <button className="btn btn-danger" onClick={()=>setIsMenuModalOpen(true)} style={{ float: 'right', margin: '30px', backgroundColor: '#ce0505' }}>Place Online Order</button>
        {/* Showing 2 Tabs on screen as Overview and Contact with details in respective sections*/}
        <div class="heading">{name}</div>
        <div class="tabs">
            {/* Tab-1 */}
            <div class="tab">
                <input type="radio" id="tab-1" name="tab-group-1" checked />
                <label for="tab-1">Overview</label>

                <div class="content">
                    <div class="about">About the place</div>
                    <div class="head">Cuisine</div>
                    {cuisineValues}
                    <div class="head">Average Cost</div>
                    <div class="value">&#8377; {cost}</div>
                </div>
            </div>
            {/* Tab-2 */}
            <div class="tab">
                <input type="radio" id="tab-2" name="tab-group-1"/>
                <label for="tab-2">Contact</label>
                <div class="content">
                    <div class="head">Phone Number</div>
                    <div class="value">+91-9876543217</div>
                    <div class="head">{name}</div>
                    <div class="value">{address}</div>
                </div>
            </div>
        </div>

        <Modal isOpen={isMenuModalOpen} style={modalStyle}>
            <h2>
                Menu
                <button onClick={()=>setIsMenuModalOpen(false)} className="btn btn-outline-danger float-end">X</button>
            </h2>
            <h3>
                {name}
            </h3>
            <ul className="">
                {
                    menu.length && 
                        menu.map((item, index)=><li key={index}>
                            <div className="col-10">
                               <div>
                                   {
                                       item.isVeg ?
                                       <div className="text-success fs-6">Veg</div>:
                                       <div className="text-danger fs-6">Non-veg</div>
                                   }
                               </div> 
                              <div className="cuisines"> {item.itemName} </div>
                              <div className="cuisines">&#8377;{item.itemPrice}</div>
                              <div className="cuisines">{item.itemDescription}</div>
                            </div>
                            <div className="col-2">
                              <button className="btn btn-secondary add" onClick={()=>subItem(item)}>-</button>
                              <label>{totalPrice}</label>
                              <button className="btn btn-secondary add" onClick={()=>addItem(item)}>+</button>
                            </div>
                            </li>)
                }
            </ul>
            <hr/>
            <h3>Total Price:{totalPrice}</h3><button class="Pay" onClick={()=>{setIsMenuModalOpen(false); setIsUserDModalOpen(true)}}>Pay Now</button>

        </Modal>
        <Modal isOpen={isUserDModalOpen} style={modalStyle}>
            <form >
                <fieldset>
                    <legend>UserDetails</legend>
                    <button onClick={()=>setIsUserDModalOpen(true)} className="btn btn-outline-danger float-end">X</button>                    
                    <label>Name:</label><input placeholder="Enter You Name" name="name" type={Text} onChange={(e)=>handleUserchange(e)}/><br/>
                    <label>Email:</label><input placeholder='Enter Email' name="email" type={'email'} onChange={(e)=>handleUserchange(e)}/><br/>
                    <label>Phone No:</label><input placeholder='Enter Your Contact No' type={Number} name="contact" onChange={(e)=>handleUserchange(e)} />
                    <label>Address:</label><input  placeholder='Enter Your Address' type={Number} name="address" onChange={(e)=>handleUserchange(e)} />
                </fieldset>
            </form>

            <button class="Pro" onClick={()=>{loadScript("https://checkout.razorpay.com/v1/checkout.js");openRazorPay(true)}}>Proceed</button>           
        </Modal>






    </div>

    )
}
