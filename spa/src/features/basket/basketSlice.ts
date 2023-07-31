import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { Basket } from '../../app/models/basket';
import agent from '../../app/api/agent';
import Cookies from 'js-cookie';
//rxslice    snippit




export interface BasketState{

    basket:Basket|null
    status:string
}
const initialState:BasketState = {
    basket:null,
    status:'idle'

}

export const fetchBasketAsync=createAsyncThunk<Basket>(
  'basket/fetchBasketAsync',
  async(_,thunkAPI)=>{
    try {
      return await agent.Basket.get();
     
      
    } 
    catch (error:any) {
      return thunkAPI.rejectWithValue({error:error.data})
     }

  },{
    condition:()=>{
      if(!Cookies.get('buyerId')) return false;
    }
  }
)

// in async we use thunkAPI for problems
export const addBasketItemAsync=createAsyncThunk<Basket,{productId:number,quantity?:number}>(

  'basket/addBasketItemAsync',
  async({productId,quantity=1},thunkAPI)=>{
    try {
      // console.log('quantity is'+quantity)

      if(parseFloat(quantity.toString()) ===0){
        quantity=1;
        // console.log('quantity 1')

      }
      
      
      return await agent.Basket.addItem(productId,quantity);
    } catch (error:any) {
      return thunkAPI.rejectWithValue({error:error.data})
     }

  }
)


export const removeBasketItemAsync=createAsyncThunk<void,{productId:number,quantity:number,name?:string}>(

  'basket/removeBasketItemAsync',
  async({productId,quantity},thunkAPI)=>{
    try {
      return await agent.Basket.deleteItem(productId,quantity);
    } catch (error:any) {
      return thunkAPI.rejectWithValue({error:error.data})
     }

  }
)


const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket:(state,action)=>{
        state.basket=action.payload
    },
    clearBasket:(state)=>{
      state.basket=null;
    }
    // removeItem:(state,action)=>{
    //     const {productId,quantity}=action.payload;
    //     const itemIndex=state.basket?.items.findIndex(i=>i.productId===productId);
    //     if(itemIndex===-1 || itemIndex=== undefined) return ;
    //     state.basket!.items[itemIndex].quantity-=quantity;

    //     if(state.basket?.items[itemIndex].quantity===0)
    //     state.basket.items.splice(itemIndex,1);
    // }

  },
  extraReducers: (builder=> {
    
    // add
    builder.addCase(addBasketItemAsync.pending, (state,action)=>{
      state.status='pendingAddItem'+action.meta.arg.productId;
      // console.log(action)
    });


    ///delete 

    builder.addCase(removeBasketItemAsync.pending, (state,action)=>{
      state.status='pendingRemoveItem'+action.meta.arg.productId+action.meta.arg.name;
      // console.log(action)
    });
    builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>{
      state.status='idle';
      const {productId,quantity}=action.meta.arg;

      const itemIndex=state.basket?.items.findIndex(i=>i.productId===productId);
      if(itemIndex===-1 || itemIndex=== undefined) return ;
      state.basket!.items[itemIndex].quantity-=quantity;

      if(state.basket?.items[itemIndex].quantity===0)
      state.basket.items.splice(itemIndex,1);


    });
    builder.addCase(removeBasketItemAsync.rejected,(state,action)=>{
      state.status='idle';
      console.log(action.payload);

    });




    builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled,fetchBasketAsync.fulfilled), (state,action)=>{
      state.status='idle';
      state.basket=action.payload;
    });
    
    builder.addMatcher(isAnyOf(addBasketItemAsync.rejected,fetchBasketAsync.rejected), (state,action)=>{
      state.status='idle';
      console.log(action.payload);
    });

  })

}); 

export const {setBasket,clearBasket} = basketSlice.actions

export default basketSlice.reducer