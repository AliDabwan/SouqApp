import Loader from "../../app/layout/Loader"
import ProductList from "./ProductList"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { setPageNumber, setProductParams } from "./catalogSlice"
import { Grid, Paper } from "@mui/material"
import ProductSearch from "./ProductSearch"
import RadioButtonGroup from "../../app/components/RadioButtonGroup"
import CheckBoxButton from "../../app/components/CheckBoxButton"
import AppPagination from "../../app/components/AppPagination"
import useProducts from "../../app/hooks/useProducts"

const sortOption =[
   { value:'name', label:'Alphabetical'},
   { value:'lowprice', label:'Price- Low To High'},
   { value:'highprice', label:'Price- High To Low'},


]
export default function Catalog() {

    const {products,filtersLoaded,brands,types,paginationData}=useProducts();
    // const [products, setProducts] = useState<Product[]>([])// context
    const dispatch=useAppDispatch();
    const {productParams}=useAppSelector(state=>state.catalog);





   

        
    // if (status.includes('pending')||!paginationData)
    if(!filtersLoaded)
     return <Loader message='Loading Products...' />
    return (
        <Grid  container spacing={2}>
            <Grid sx={{mt:3}} item xs={6} sm={2.2} >
                <Paper sx={{mb:2}}>
                  <ProductSearch/>


                </Paper>
                <Paper sx={{mb:2,p:2}}>
               <RadioButtonGroup 
               selectedValue={productParams.orderBy}
               options={sortOption}
               onChange={(e)=>dispatch(setProductParams({orderBy:e.target.value}))}
               />

                </Paper> 
                <Paper sx={{mb:2,p:2}}>

                    <CheckBoxButton 
                    items={types}
                    checked={productParams.types}
                    onChange={(items:string[])=>dispatch(setProductParams({types:items}))}
                    />
              

                </Paper>

                <Paper sx={{mb:2,p:2}}>
                        {/* <FormGroup>
                {
                                types.map(type=>(
                                    <FormControlLabel key={type} label={type} control={<Checkbox/>} />

                                ))

                                }
                        </FormGroup> */}
                        <CheckBoxButton 
                    items={brands}
                    checked={productParams.brands}
                    onChange={(items:string[])=>dispatch(setProductParams({brands:items}))}
                    />
             

                </Paper>

            </Grid>

            <Grid sx={{mt:3}} item xs={6} sm={9.8} >

            <ProductList products={products}></ProductList>
            
            </Grid>
            <Grid item xs={6} sm={2.2}/>
            <Grid item xs={6} sm={9.8}>
                {paginationData&&
                  <AppPagination
                  paginationData={paginationData}
                  onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
                  />
                }
              
            </Grid>

        </Grid>
    )
}
