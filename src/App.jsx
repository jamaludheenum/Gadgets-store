import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import ProductDetail from './Pages/ProductDetail'
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import Login from "./Pages/Login";
import Navbar from './Components/Navbar'


function App() {
 

  return (
<BrowserRouter>

<Navbar/>
<Routes>

<Route path='/' element={<Home/>}/>
<Route path='/products' element={<Products/>}/>
<Route path='/product:id' element={<ProductDetail/>}/>
<Route path="/cart" element={<Cart />} />
<Route path="/payment" element={<Payment />} />
<Route path="/login" element={<Login />} />




</Routes>

</BrowserRouter>
  )
}

export default App
