import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {
    products: Product[]
}
export default function ProductList({ products }: Props) {

    const {productsLoaded}=useAppSelector(state=>state.catalog);

    return (
        <Grid sx={{ mt: 1 }} container rowSpacing={2} columnSpacing={2}>
            {
                products.map(product => (
                    <Grid key={product.id} item xs={12} sm={4} lg={3}>
                        {!productsLoaded ?(
                            <ProductCardSkeleton/>

                        ):
                        (
                            <ProductCard product={product}></ProductCard>

                        )

                        }
                    </Grid>
                ))
            }
        </Grid>
    )
}
