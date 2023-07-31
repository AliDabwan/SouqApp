import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Skeleton
} from "@mui/material";

export default function ProductCardSkeleton() {
    return (
        <Grid item xs component={Card}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
            />
            <Skeleton sx={{ height: 267 }} animation="wave" variant="rectangular" />
            <CardContent >
                <Skeleton animation="wave" height={10} width="70%" style={{ paddingBottom: 5, margin: 'auto' }} />
                <Skeleton animation="wave" height={10} width="50%" style={{ paddingBottom: 3, margin: 'auto' }} />
                <Skeleton animation="wave" height={10} width="50%" style={{ paddingBottom: 3, margin: 'auto' }} />
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
                <>
                    <Skeleton animation="wave" height={10} width='40%' />
                    <Skeleton animation="wave" height={10} width="40%" />
                </>
            </CardActions>
        </Grid>
    )
}