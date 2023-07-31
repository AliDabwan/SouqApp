import { createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "../../app/store/configureStore";
import { PaginationData } from "../../app/models/PaginationData";

type CatalogState={
  productsLoaded:boolean,
  filtersLoaded:boolean,
  status:string,
  brands:string[],
  types:string[],
  productParams:ProductParams
  paginationData:PaginationData|null
}
const productsAdapter=createEntityAdapter<Product>();

const getAxiosParams=(productParams:ProductParams)=>{
  const params=new URLSearchParams();
  params.append('pageNumber',productParams.pageNumber.toString())
  params.append('pageSize',productParams.pageSize.toString())
  params.append('orderBy',productParams.orderBy)
 if(productParams.searchTerm) params.append('searchTerm',productParams.searchTerm)
 if(productParams.brands.length>0) params.append('brands',productParams.brands.toString())
 if(productParams.types.length>0) params.append('types',productParams.types.toString())
return params

}

export const fetchProductsAsync=createAsyncThunk<Product[],void,{state:RootState}>(

    'catalog/fetchProductsAsync',
    async(_,thunkAPI)=>{
      const params=getAxiosParams(thunkAPI.getState().catalog.productParams); // this method get the global state or redux state

      try {
        const response= await agent.Catalog.list(params);
        thunkAPI.dispatch(setPaginationData(response.paginationData))
        return response.items;
      } catch (error:any) {
        return thunkAPI.rejectWithValue({error:error.data})
      }
  
    }
  )


  export const fetchProductAsync=createAsyncThunk<Product,string>(

    'catalog/fetchProductAsync',
    async(productId,thunkAPI)=>{
      try {
        return await agent.Catalog.details(productId);
      } catch (error:any) {
       return thunkAPI.rejectWithValue({error:error.data})
      }
  
    }
  )
  
  export const fetchfiltersAsync=createAsyncThunk(

    'catalog/fetchfiltersAsync',
    async(_,thunkAPI)=>{
      try {
        return await agent.Catalog.fetchFilters();
      } catch (error:any) {
       return thunkAPI.rejectWithValue({error:error.data})
      }
  
    }
  )
  
  const initParams=()=>({

    pageNumber:1,
    pageSize:8,
    orderBy:'name',
    types:[],
    brands:[]
  })

  const catalogSlice = createSlice({
    name: 'catalog',
    initialState:productsAdapter.getInitialState<CatalogState>({
        productsLoaded:false,
        filtersLoaded:false,
        status:'idle',
        brands:[],
        types:[],
        productParams:initParams(),
        paginationData:null
         

        
    }), // get initialstate return all collections ids and entities inside coll
    reducers: {
      setProductParams:(state,action)=>{
        state.productsLoaded=false;
        state.productParams={...state.productParams,...action.payload,pageNumber:1}
      },
      resetProductParams:(state)=>{
        state.productParams=initParams();
      },
      setPageNumber:(state,action)=>{
        state.productsLoaded=false;
        state.productParams={...state.productParams,...action.payload}
      },
    
    setPaginationData:(state,action)=>{
      state.paginationData=action.payload;
    },
    setProduct:(state,action)=>{
      productsAdapter.upsertOne(state,action.payload);
      state.productsLoaded=false;
    },
    removeProduct:(state,action)=>{
      productsAdapter.removeOne(state,action.payload);
    }
    },
    extraReducers: (builder=> {
    
        // GetAllListProducts
        builder.addCase(fetchProductsAsync.pending, (state)=>{
          state.status='pendingFetchProductsAsync';
          // console.log(action)
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
          state.status='idle';
          productsAdapter.setAll(state,action.payload);
          state.productsLoaded = true;

        });
        builder.addCase(fetchProductsAsync.rejected,(state,action)=>{
          state.status='idle'
          console.log(action.payload)

        });

        //get single product
        builder.addCase(fetchProductAsync.pending, (state)=>{
            state.status='pendingFetchProductAsync';
            // console.log(action)
          });
          builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
            state.status='idle';
            productsAdapter.upsertOne(state,action.payload);
  
          });
          builder.addCase(fetchProductAsync.rejected,(state,action)=>{
            state.status='idle'
            console.log(action)
          });
    

          //filter single product
        builder.addCase(fetchfiltersAsync.pending, (state)=>{
          state.status='pendingFetchFiltersAsync';
          // console.log(action)
        });
        builder.addCase(fetchfiltersAsync.fulfilled,(state,action)=>{
          state.status='idle';
          state.filtersLoaded=true;
          state.brands=action.payload.brands;
          state.types=action.payload.types;

        });
        builder.addCase(fetchfiltersAsync.rejected,(state,action)=>{
          state.status='idle'
        });
  
    
       
    
      })
  });
  

export const productSelectors=productsAdapter.getSelectors((state:RootState)=>state.catalog);

export const {resetProductParams,setProductParams,setPaginationData,setPageNumber,setProduct,removeProduct}=catalogSlice.actions;
//   export const {} = catalogSlice.actions
  
  export default catalogSlice.reducer