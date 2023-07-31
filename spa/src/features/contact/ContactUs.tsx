import Typography from '@mui/material/Typography'
import { ButtonGroup, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { decrement, increment } from './counterSlice';
export default function ContactUs() {

    // const {data,title}=useSelector((state:CounterState)=>state);

    // const dispatch=useDispatch();

    const dispatch=useAppDispatch();
    const {data,title}=useAppSelector(state=>state.counter);


    return (
        <>
         <Typography gutterBottom  marginTop={10} variant="h2" color="initial">
         data:  {data}
        </Typography>
        <Typography variant="h2" color="initial">
         title:  {title}
        </Typography>
        <ButtonGroup sx={{mt:2}}>

            {/* <Button onClick={()=>dispatch({ type: DECREMENT_COUNTER })} variant="contained" color="primary">Decrement</Button>
            <Button onClick={()=>dispatch({ type: INCREMENT_COUNTER })} variant="contained" color="secondary">Increment</Button> */}

            <Button onClick={()=>dispatch(decrement(1) )} variant="contained" color="primary">Decrement</Button>
            <Button onClick={()=>dispatch(increment(1))} variant="contained" color="secondary">Increment</Button>

            <Button onClick={()=>dispatch(increment(5))} variant="contained" color="secondary">Increment 5</Button>

        </ButtonGroup>

        </>
       
    ) 
}
