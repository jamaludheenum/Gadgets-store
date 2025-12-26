
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import ProductDetail from './Pages/ProductDetail'
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import Login from "./Pages/Login";
import Navbar from './Components/Navbar'
import Checkout from './Components/Checkout';
import Tester from './Components/Context/Tester';
import Footer from './Components/Footer';
import Categories from './Pages/Categories';
import SignUp from './Pages/SignUp';
import ScrollToTop from './Components/ScrollToTop';


function App() {

 

  return (
    
<BrowserRouter>
<ScrollToTop/>
  <Navbar />
<Routes>

<Route path='/' element={<Home />}/>
<Route path='/products' element={<Products/>}/>
<Route path='/product/:id' element={<ProductDetail/>}/>
<Route path="/cart" element={<Cart />} />
<Route path="/payment" element={<Payment />} />
<Route path="/login" element={<Login />} />
<Route path='/checkout' element={<Checkout/>}/>
<Route path='/categories' element={<Categories/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<SignUp/>}/>
{/* <Route path='/T' element={<Tester/>}/> */}



</Routes>
<Footer/>
</BrowserRouter>
  )
}

export default App
