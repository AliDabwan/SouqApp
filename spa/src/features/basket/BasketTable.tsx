import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/helper/helper";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";



type Props={
    items:BasketItem[]
    isBasket?:boolean
}
export default function BasketTable({items,isBasket=true}:Props) {
    
    const {status}=useAppSelector(state=>state.basket); // redux
    const dispatch=useAppDispatch();
    const handleAddItem=(productId:number)=>{
      
        dispatch( addBasketItemAsync({productId:productId}))
  
  
  
    }
      const handleRemoveItem=(productId:number,quantity=1,name:string)=>{
        dispatch( removeBasketItemAsync({productId:productId,quantity:quantity,name}))
  
      }
  return (
    <TableContainer  sx={{mt:10}}  component={Paper}>
    <Table sx={{ minWidth: 650 }} >
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Quantity</TableCell>
          <TableCell align="center">SubTotal</TableCell>
          {isBasket && 
                    <TableCell align="center">Delete</TableCell>

          }
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <TableRow
            key={row.productId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Box
              sx={{color:'inherit',textDecoration:'inherit'}}
              component={Link}
              to={`../catalog/${row.productId}`}
               display={'flex'}
               alignItems={'center'}>
                <img src={row.pictureUrl} alt={row.name} style={{height:50,marginRight:20}} />
                <span>{row.name}</span>

              </Box>
            </TableCell>
            <TableCell align="center">
              {
                currencyFormat(row.price)
            }

           
              </TableCell>
         
              
            <TableCell align="center">
            {isBasket && 
            <LoadingButton 
              // loading={status.loading&&status.name==='rem'+row.productId}
              loading={(status==='pendingRemoveItem'+row.productId+'rem')}

              onClick={()=>handleRemoveItem(row.productId,1,'rem')}
              color='error'
              sx={{ fontWeight: 'bolder' }} 
              size="small"> 
                <Remove/>
                </LoadingButton>
                }
              {row.quantity}
              {isBasket && 
              <LoadingButton 
              // loading={status.loading&&status.name==='add'+row.productId}
              loading={(status==='pendingAddItem'+row.productId)}

              onClick={()=>handleAddItem(row.productId)}
              color='secondary'
              sx={{ fontWeight: 'bolder' }} 
              size="small">
                <Add/>
                </LoadingButton>
                    }
            
            </TableCell>
            
                
            <TableCell align="center">{currencyFormat((row.price * row.quantity))}</TableCell>
            <TableCell align="center">
            {isBasket && 
            <LoadingButton 
              //  loading={status.loading&&status.name==='del'+row.productId}
              loading={(status==='pendingRemoveItem'+row.productId+'del')}

               onClick={()=>handleRemoveItem(row.productId,row.quantity,'del')}
                color='error'>
                <Delete/>
                </LoadingButton>

            }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>  )
}
