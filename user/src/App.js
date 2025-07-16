import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./Componetns/Header";
import Footer from "./Componetns/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Menu from "./Pages/Menu";
import Review from "./Pages/Review";
import Cart from "./Pages/Cart";
import Invoice from "./Pages/Invoice";



function App(){
    return(
        <>
<BrowserRouter>
<Header/>
<Routes>

  <Route path="/" element={<Home/>}></Route>
  <Route path="/Menu" element={<Menu/>}></Route>
  <Route path="/About" element={<About/>}></Route>
  <Route path="/Review" element={<Review/>}></Route>
  <Route path="/Cart" element={<Cart/>}></Route>
  <Route path="/invoice/:Order_no" element={<Invoice />} />
 

</Routes>
<Footer/>
</BrowserRouter>
        
        </>
    );
}
    export default App;