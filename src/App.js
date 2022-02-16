import './App.css';
import Wallpaper from './Components/Wallpaper';
import QuickSearches from './Components/QuickSearches';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Filter from './Components/Filter';
import RestaurantDetails from './Components/RestaurantDetails';

function App() {
  return (
    
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Home/>} ></Route>
           <Route path='/QS' element={<QuickSearches/>}></Route>
           <Route path='/Filter' element={<Filter/>}></Route>  
           <Route path='/restaurantDetails/:rName' element={<RestaurantDetails/>}></Route>
         </Routes>
      </BrowserRouter>
   
  );
}

export default App;
