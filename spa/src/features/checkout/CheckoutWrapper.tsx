import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import Loader from "../../app/layout/Loader";
import { history } from "../..";


const stripePromise=loadStripe('pk_test_51NLvadLRCdXbPQVRmp4hVGpvcZFMegnlrLgyVKkMZMVeLAFQqvhjEqfYZv0rwrKV2JmnYZLstWwaKqXxkXB0zliB00a2rpjr3s');
export default function CheckoutWrapper() {
  const dispatch=useAppDispatch();
  const [loading, setLoading] = useState(true);
  const {basket}=useAppSelector(state=>state.basket);

  useEffect(() => {

    if(!basket || basket.items.length===0){
      history.push('../login');
      return;
    }
   agent.Payment.createPaymentIntent()
   .then(basket=>dispatch(setBasket(basket)))
   .catch(error=>console.log(error))
   .finally(()=>setLoading(false));

   //eslint-disable-next-line
  }, [dispatch])
  

  if(loading)return <Loader message="Loading check out"/>
  return (
    <Elements stripe={stripePromise}>
        <CheckoutPage/>
    </Elements>
  )
}
