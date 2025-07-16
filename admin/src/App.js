import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sildebar from "./Components/Sildebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Menu_Grid from "./pages/Menu_Grid";
import AddProduct from "./pages/Add_Product";
import Addcategory from "./pages/Add_category";
import Viewcategory from "./pages/View_category";
import EditCategory from "./pages/EditCategory";
import EditMenu from "./pages/edit_menu";
import Viewtable from "./pages/Viewtable";
import Addtable from "./pages/Addtable";
import Changepass from "./pages/Changepass";
import { useLocation } from "react-router-dom";
import Edittable from "./pages/Edittable";

  
function App(){
  return(
    <BrowserRouter>
    <MainContent/>
    </BrowserRouter>
  );
  }

  function MainContent(){

    const location = useLocation();
    const iscompanyReg = location.pathname === "/";
    const iscompanyReg1 = location.pathname === "/Changepass";
    return(
      <>
      {!iscompanyReg && !iscompanyReg1 &&  (
        
        <Header/>
      )}
          <div className="container-fluid page-body-wrapper">

      {!iscompanyReg && !iscompanyReg1 && <Sildebar/>}
      

   
   <Routes>
   
    <Route path="/" element={<Login/>}></Route>
    <Route path="/Dashboard" element={<Dashboard/>}></Route>
    <Route path="/Profile" element={<Profile/>}></Route>
    <Route path="/Menu_Grid"  element={<Menu_Grid/>}></Route>
    <Route path="/AddProduct"  element={<AddProduct/>}></Route>
    <Route path="/Addcategory" element={<Addcategory/>}></Route>
    <Route path="/Viewcategory" element={<Viewcategory/>}></Route>
    <Route path="/EditCategory" element={<EditCategory/>}></Route>
    <Route path="/editmenu"  element={<EditMenu/>}></Route>
    <Route path="/Viewtable" element={<Viewtable/>}></Route>
    <Route path="/Addtable"  element={<Addtable/>}></Route>
    <Route path="/Changepass" element={<Changepass/>}></Route>
    <Route path="/Edittable"  element={<Edittable/>}></Route>

   </Routes>
   {!iscompanyReg && !iscompanyReg1 && <Footer/>}
   </div>
   </>
  );
}

export default App;
