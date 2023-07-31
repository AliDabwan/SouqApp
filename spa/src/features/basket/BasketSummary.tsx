import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { currencyFormat } from "../../app/helper/helper";
import { useAppSelector } from "../../app/store/configureStore";

type Props={
    subtotal?:number,
    itemCounts?:number

}
export default function BasketSummary({subtotal,itemCounts}:Props) {
    // const {basket}=useSouqContext();
    const {basket}=useAppSelector(state=>state.basket); // redux


    // ??0 if null return 0
    if(subtotal===undefined)
     subtotal = basket?.items.reduce((sum,item)=>sum+(item.quantity*item.price),0)??0;
    //  toast.success('sub is :'+subtotal);
    const deliveryFee = (subtotal>100000 || subtotal===0) ?0:2000;
    // toast.success('deliveryFee is :'+deliveryFee);

    if(itemCounts===undefined)
     itemCounts=basket?.items.reduce((count,item)=>count+item.quantity,0)??0;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                    <TableRow>
                            <TableCell colSpan={2}>Total Qty</TableCell>
                            <TableCell align="right">{itemCounts}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        {/* <TableRow>
                            <TableCell colSpan={2}>reaTotall</TableCell>
                            <TableCell align="right">{subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>realFee</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow> */}

                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{ currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                     
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over 1000 USD qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           
        </> 
    )
}