import { Divider, Paper, Typography, Button } from '@mui/material'
import Container from '@mui/material/Container'
import { useLocation, useNavigate } from 'react-router-dom'
export default function ServerError() {
    const navigate = useNavigate();
    const { state } = useLocation();
    return (
        <Container sx={{ mt: 10 }} component={Paper} >
            {
                state?.error ? (
                    <>
                        <Typography variant="h4" color="error" gutterBottom>{state.error.title}</Typography>
                        <Divider />
                        <Typography variant="body1" color="initial">{state.error.detail || 'Internal server error'}</Typography>
                    </>
                ) : (
                    <Typography variant="h5" gutterBottom color="initial">Server Error</Typography>
                )
            }
            <Button onClick={() => navigate(-1)} color="primary">
                Go back
            </Button>
        </Container>
    )
}
