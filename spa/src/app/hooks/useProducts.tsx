import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchProductsAsync, fetchfiltersAsync, productSelectors } from "../../features/catalog/catalogSlice";

export default function useProducts() {
    const products=useAppSelector(productSelectors.selectAll);
    const dispatch=useAppDispatch();
    const {productsLoaded,filtersLoaded,brands,types,paginationData}=useAppSelector(state=>state.catalog);





    useEffect(() => { 

        // agent.Catalog.list()
        //     .then(products => setProducts(products))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false))

        if (!productsLoaded) {
            dispatch(fetchProductsAsync())
            
        }


    }
        , [productsLoaded,dispatch])

        useEffect(() => {

           
            if (!filtersLoaded) {
                dispatch(fetchfiltersAsync())
                
            }
    
    
        }
            , [filtersLoaded,dispatch])

        return{
            products,productsLoaded,filtersLoaded,brands,types,paginationData
        }
}
