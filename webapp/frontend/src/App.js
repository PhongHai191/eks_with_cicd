import {BrowserRouter,Routes,Route} from "react-router-dom"

import Navbar from "./Navbar"

import Login from "./Login"
import Signup from "./Signup"
import Products from "./Products"
import ProductPage from "./ProductPage"

function App(){

 return(

  <BrowserRouter>

   <Navbar/>

   <Routes>

    <Route path="/" element={<Products/>}/>

    <Route path="/product/:id" element={<ProductPage/>}/>

    <Route path="/login" element={<Login/>}/>

    <Route path="/signup" element={<Signup/>}/>

   </Routes>

  </BrowserRouter>

 )

}

export default App