import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material";
import { Order } from "../../app/models/order";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loader from "../../app/layout/Loader";
import OrderDetails from "./OrderDetails";
import { DoneAll } from "@mui/icons-material";
import { currencyFormat } from "../../app/helper/helper";

export default function Orders() {

    const [orders, setOrders] = useState<Order[]|null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    useEffect(() => {
     
         agent.Orders.list()
        .then(orders=>setOrders(orders))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false))
    }, [])

    if(loading)return <Loader message="Loading order..."/>
    if(selectedOrderNumber>0)return (
        <OrderDetails order={orders?.find(o=>o.id===selectedOrderNumber)!} setSelectedOrder={setSelectedOrderNumber} />
    )

  return ( 
    <TableContainer sx={{mt:10}} component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell align="center">Order Date</TableCell>
          <TableCell align="center">Total</TableCell>
          <TableCell align="center">Order Status</TableCell>
          <TableCell align="center">Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders!.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="center">{row.orderDate}</TableCell>
            <TableCell align="center">{currencyFormat(row.total)}</TableCell>
            <TableCell align="center">
              {row.orderStatus==="PaymentReceived"?
              (
              <Button variant="contained" color="success" size="small" endIcon={<DoneAll/>} >{row.orderStatus}
              </Button>
              )
              :
              <Button variant="contained" color="success" size="small"  
            
               >{row.orderStatus}
              </Button>
             

              }
            
            </TableCell>
            <TableCell align="center">
                <Button onClick={()=>setSelectedOrderNumber(row.id)}>
                    View
                </Button>


            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>  )
}
