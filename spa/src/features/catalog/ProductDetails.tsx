import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import Grid from '@mui/material/Grid'
import { Divider, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import NotFound from '../../app/errors/NotFound';
import Loader from '../../app/layout/Loader';
import { currencyFormat } from '../../app/helper/helper';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {  addBasketItemAsync, removeBasketItemAsync } from '../basket/basketSlice';
import { fetchProductAsync, productSelectors } from './catalogSlice';

export default function ProductDetails() {

    // const {basket,setBasket,removeItem}=useSouqContext(); context api
    const {status:productStatus}=useAppSelector(state=>state.catalog); // redux

    const {basket,status}=useAppSelector(state=>state.basket); // redux
    const dispatch=useAppDispatch();


    const { id } = useParams();

    // const [product, setProduct] = useState<Product | null>(null);
    const product=useAppSelector(state=>productSelectors.selectById(state,id!));


    // const [loading, setLoading] = useState(true);

    const [quantity,setQuantity]= useState(0);
    // const [submitting,setSubmitting]= useState(false);

    const item=basket?.items.find(i=>i.productId===product?.id);




    useEffect(() => {
        document.body.style.background = 'inherit'
        if(item)setQuantity(item.quantity);
        // agent.Catalog.details(id!)
        //     .then(product => setProduct(product))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false))
        if(!product)dispatch(fetchProductAsync(id!));




    }, [id,item,product,dispatch])
    useEffect(() => {
        return () => {
            document.body.style.background = '#e7e7e7'
        }
    }, [])

    const handleInputAddChange= (event: any) =>{
        console.log('add');

        if(event.target.value>0)
        setQuantity(event?.target.value);


    }
    const handleInputUpdateChange= (event: any) =>{
        console.log('update');

        if(event.target.value>=0)
        setQuantity(event?.target.value);

    }



    // const handleUpdateCartUsingContext=()=>{
    //     setSubmitting(true);
    //     if(!item || quantity>item.quantity){
          
           
    //         var updatedQuantity=item?quantity-item.quantity:quantity;
    //         if(updatedQuantity==0){
    //             updatedQuantity=1;
    //         }


    //         agent.Basket.addItem(product?.id!,updatedQuantity)
    //         .then(basket=>dispatch(setBasket(basket)))
    //         .catch(error=>console.log(error))
    //         .finally(()=>setSubmitting(false)
    //         )
    //     }else{
            
    //         const updatedQuantity=item.quantity-quantity;
    //         agent.Basket.deleteItem(product?.id!,updatedQuantity)
    //         .then(()=>dispatch(removeItem({productId: product?.id!,quantity: updatedQuantity}))) // update the context
    //         .catch(error=>console.log(error))
    //         .finally(()=>  setSubmitting(false)
        
    //         )
    //     }

    // } 

    const handleUpdateCart=()=>{
        if(!item || quantity>item.quantity){
          
        //    var defzero=0;
            var updatedQuantity=item?quantity-item.quantity:quantity;
            if(updatedQuantity===0){
                updatedQuantity=1;
            }


            dispatch( addBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
                }else{
            
            const updatedQuantity=item.quantity-quantity;
            
            dispatch( removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))

            
        } 

    } 
    // const doFainal=()=>{ 
      

    //     history.push('../basket');


    // }
    if (productStatus.includes('pending')) return (
        <Loader message='Loading Product...' />
    )
    if (!product) return (
        <NotFound />
    )
    return (
        <Grid container spacing={6} marginTop={0}>
            <Grid item xs={12} md={6}>
                <img  src={product.pictureUrl} alt={product.name} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h4" color="initial">{product.name}</Typography>
                <Divider sx={{ borderBottomWidth: 'medium', my: 2 }} variant="fullWidth" />
                <Typography fontWeight="bolder" color="primary.dark" variant="h4">
                    {/* {(product.price / 100).toFixed(2)} EGP */}
                    {currencyFormat(product.price)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell>In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableHead>

                    </Table>
                </TableContainer>
                <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={6}>
                        <TextField
                        onChange={item?handleInputUpdateChange:handleInputAddChange}
                          label="Quantity in cart"
                          variant='outlined'
                          type='number'
                          fullWidth
                          value={quantity}
                        />


                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton 
                       
                    

                        sx={{height:'55px'}}
                        color='primary'
                        size='large'
                        variant='contained'
                        fullWidth
                        loading={(status.includes('pending'))}
                        disabled={(item?.quantity===quantity)||(!item&&quantity===0)}
                        onClick={handleUpdateCart}
                        >
                            {item?'Update Quantity':'Add To Cart'}

                        </LoadingButton>


                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
