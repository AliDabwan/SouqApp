
import { Grid, Typography } from "@mui/material";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { useAppSelector } from "../../app/store/configureStore";



export default function Review() {

    const {basket}=useAppSelector(state=>state.basket);
    return (
        <>
            <Typography variant="h6" sx={{mb:-10}}>
                Order summary
            </Typography>
            <BasketTable items={basket!.items} isBasket={false} />
       
       <Grid container spacing={0} sx={{mt:1}}>
                   <Grid item xs={6}  />
                   <Grid item xs={6}>
                       <BasketSummary/>
                       
                   
                   </Grid>
                 
       </Grid>
           
        </>
    );
}
