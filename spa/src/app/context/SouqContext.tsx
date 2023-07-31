import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface SouqContextValue{
    basket:Basket|null;
    setBasket:(basket:Basket)=>void;
    removeItem:(productId:number,quantity:number)=>void;
}

export const SouqContext=createContext<SouqContextValue|undefined>(undefined);

//the provider
export const useSouqContext=()=>{
    const context=useContext(SouqContext);
    if(context===undefined)throw Error('No Souq Provider avvail');
    return context;

}

//children is any component in app 
export const SouqProvider=({children}:PropsWithChildren<any>)=>{

    
    const [basket, setBasket] = useState<Basket|null>(null);

    const removeItem=(productId:number,quantity:number)=>{
        if(!basket)return;
        // take copy to edit
        const items=[...basket.items];
        //get item from index that will be removed
        const itemIndex=items.findIndex(i=>i.productId===productId);
        if(itemIndex>=0){
            items[itemIndex].quantity-=quantity;
            //remove element from array
            if(items[itemIndex].quantity===0)items.splice(itemIndex,1);

            setBasket(prevState=>{return{...prevState!,items}});
            // update prev state from new copy
        }
    }

    return (
        <SouqContext.Provider value={{basket,setBasket,removeItem}}>
            {/* any components in the  app is by  use  word above */}
            {children}
        </SouqContext.Provider>
    )
}