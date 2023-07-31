import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import basketSlice from "../../features/basket/basketSlice";
import catalogSlice from "../../features/catalog/catalogSlice";
import accountSlice from "../../features/account/accountSlice";


// here the stor come from counter roducer
// export const configureStore=()=>{


//     return createStore(counterReducer)
// }

// here the store come from counter slice using  tool kit
export const SouqStore=configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket:basketSlice,
        catalog:catalogSlice,
        account:accountSlice

    }
})



export type RootState=ReturnType<typeof SouqStore.getState>;
export  type AppDispatch=typeof SouqStore.dispatch;
export const  useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;