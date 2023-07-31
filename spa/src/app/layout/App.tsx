import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutUs from "../../features/about/AboutUs";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactUs from "../../features/contact/ContactUs";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
// import { useSouqContext } from "../context/SouqContext";
import { useCallback, useEffect, useState } from "react";
import Loader from "./Loader";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import ProtectedRout from "./ProtectedRout";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";

function App() {

  // const {setBasket}=useSouqContext();

  const dispatch=useAppDispatch();


  const [loading, setLoading] = useState(true);

  enum myRols {
    Admin = 'Admin',
    Member='Member'
   
  }




  const initApp=useCallback(async()=>{
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());



    } catch (error) {
      console.log(error)
    }
  },[dispatch]) 

  useEffect(() => {

    // dispatch(fetchCurrentUser());

    // const buyerId=Cookies.get('buyerId');

    // if(buyerId){
    //   // agent.Basket.get()
    //   // .then(basket=>setBasket(basket))
    //   // .catch(error=>console.log(error))
    //   // .finally(()=>setLoading(false))

    //   agent.Basket.get()
    //   .then(basket=>dispatch(setBasket(basket)))
    //   .catch(error=>console.log(error))
    //   .finally(()=>setLoading(false))



 
    // }else{
    //   setLoading(false)
    //   console.log('error')

    // }

    initApp().then(()=>setLoading(false))

  },[initApp] )
  
  if(loading)return<Loader message="Loading App...!!!" />

  

  return (
    <>
      <ToastContainer theme="colored" position="bottom-right" autoClose={3000} hideProgressBar />
      <Header />
      <Box sx={{ mt: 7, mb: 2, px: 2 }}>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<ProductDetails />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="checkout" element={<ProtectedRout><CheckoutWrapper /></ProtectedRout> } />
          <Route path="orders" element={<ProtectedRout ><Orders/></ProtectedRout> } />
          <Route path="inventory" element={<ProtectedRout roles={[myRols.Admin]} ><Inventory/></ProtectedRout> } />

          <Route path="server-error" element={<ServerError />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
