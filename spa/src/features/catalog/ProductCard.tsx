import { Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/helper/helper";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

type Props = {
    product: Product
}
export default function ProductCard({ product }: Props) {
    // const [lodaing, setLodaing] = useState(false); local using befor async thunk
    const {status}=useAppSelector(state=>state.basket);


    // const {setBasket}=useSouqContext();
    const dispatch=useAppDispatch();



    // const handleAddItem=(productId:number)=>{
    //     setLodaing(true);
    //     agent.Basket.addItem(productId).then(basket=>dispatch(setBasket(basket)))

    //     .catch(error=>console.log(error))
    //     .finally(()=>setLodaing(false));

    // }



    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'primary.dark' }}>
                        {product.brand.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{ variant: "body2", sx: { fontWeight: 'bolder', color: 'primary.dark' } }}

            />
            <CardMedia
                component="img"
                height="200"
                image={product.pictureUrl}
                alt={product.name}
                title={product.name}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent>
                
                <Typography fontWeight="bolder" textAlign="center" gutterBottom variant="h5" color="primary.dark">
                    {/* {(product.price / 100).toFixed(2)} EGP */}
                    {currencyFormat(product.price)}
                </Typography>
                <Typography fontWeight="bolder" textAlign="center" variant="body1" color="text.secondary">
                    {product.brand}<br/>
                    {product.type}
                </Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>

                <LoadingButton loading={status==='pendingAddItem'+product.id}
                // onClick={()=>handleAddItem(product.id)}
                onClick={()=>dispatch( addBasketItemAsync({productId:product.id}))}

                sx={{ fontWeight: 'bolder' }} 
                size="small">Add To Cart</LoadingButton>
                
                <Button
                    sx={{ fontWeight: 'bolder' }}
                    size="small"
                    component={Link}
                    to={`/catalog/${product.id}`}
                >View Product</Button>
            </CardActions>
        </Card>
    )
}
