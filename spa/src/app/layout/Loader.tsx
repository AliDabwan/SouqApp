import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

type Props = {
    message?: string
}
export default function Loader({ message = 'Loading...' }: Props) {
    return (
        <Backdrop open invisible>
            <Box display='flex' justifyContent='center' alignItems='center' height="100vh">
                <CircularProgress size={100} />
                <Typography sx={{ justifyContent: 'center', position: 'fixed', top: '60%' }} variant="h4" color="initial">
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    )
}
