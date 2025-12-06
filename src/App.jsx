import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Pages/Home.jsx';
import Shop from './Pages/shop.jsx';
import Cart from './Pages/Cart.jsx';
import './App.css'
import Checkout from './Pages/Checkout.jsx';
import Order from './Pages/Order.jsx';
import { useState } from 'react';
import FilterData from './Pages/FilterData.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';




function App() {
  const [order, setOrder] = useState(null)


  return (
   <BrowserRouter >
   <Navbar/>
   <Routes>
    <Route path='/' element = {<Home/>}></Route>
    <Route path='/shop' element = {<Shop/>} ></Route>
    <Route path='/cart' element ={<Cart/>}></Route>
    <Route path='/checkout' element = {<Checkout setOrder={setOrder}/>}></Route>
    <Route path='/order-confirmation' element = {<Order order={order}/>}></Route>
    <Route path='/filter-data' element ={< FilterData/>}></Route>
    <Route path='/product/:id' element ={< ProductDetail/>}></Route>
    

    
    </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
