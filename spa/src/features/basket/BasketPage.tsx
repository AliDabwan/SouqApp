import { Grid, Button } from '@mui/material';
import BasketSummary from './BasketSummary';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import BasketTable from './BasketTable';

export default function BasketPage() {

    // const [loading, setLoading] = useState(true);
    // const [basket, setBasket] = useState<Basket|null>(null);
    //  useEffect(() => {

    //   agent.Basket.get().then(basket=>setBasket(basket))
    //   .catch(error=>console.log(error))
    //   .finally(()=>setLoading(false))
    // }, [])
    
    // if(loading)return<Loader message="Loading basket....!!!" />

      // const {basket,setBasket,removeItem}=useSouqContext();

      const {basket}=useAppSelector(state=>state.basket); // redux


      //NEW TYPES FOR VARIABLES IMPORTANT ***ALI_23_04_15
      // const [status, setStatus] = useState({
      //   loading:false,
      //   name:''

      // });
      
      
    //   const handleAddItemusingContext=(productId:number,name:string)=>{
    //     setStatus({loading:true,name:name});

    //     agent.Basket.addItem(productId).then(basket=>dispatch( setBasket(basket)))
    //     .catch(error=>console.log(error))
    //     .finally(()=>setStatus({loading:false,name:''}));


    // }
    
    // const handleRemoveItemusingContext=(productId:number,quantity=1,name:string)=>{
    //   setStatus({loading:true,name:name});
    //   agent.Basket.deleteItem(productId,quantity)
    //   .then(()=>dispatch( removeItem({productId,quantity})))
    //   .catch(error=>console.log(error))
    //   .finally(()=>setStatus({loading:false,name:''}));
    // }


  //   const handleAddItem=(productId:number)=>{
      
  //     dispatch( addBasketItemAsync({productId:productId}))



  // }
  //   const handleRemoveItem=(productId:number,quantity=1,name:string)=>{
  //     dispatch( removeBasketItemAsync({productId:productId,quantity:quantity,name}))

  //   }
   

    if(!basket || basket.items.length===0)
    return  <Navigate to="../" />
    // <Typography sx={{mt:10}} variant="h3" color="initial"> Basket is empty</Typography>


  return (
    <>
        {/* <Typography sx={{mt:10}}  variant="h4" color="initial"> Buyer Id is :{basket.buyerId}</Typography> */}
        <BasketTable items={basket.items} />
       
      <Grid container spacing={0} sx={{mt:1}}>
                  <Grid item xs={6}  />
                  <Grid item xs={6}>
                      <BasketSummary/>
                      <Button  component={Link}
                to={'../checkout'}
                variant='contained'
                size='large'
                fullWidth>
                  Check Out

                      </Button>
                  
                  </Grid>
                
      </Grid>

    </>
  )
}

