import { Box, Button, Paper, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 450, mt: 17, textAlign: "center" }}>
            <Typography gutterBottom variant="h3" color="initial">
                Sorry, what you are looking for not found!
            </Typography>
            <Box component="img"
                sx={{
                    mb: 2,
                    height: 300,
                    width: "100%"
                }}
                src={'../images/404.png'}
            />
            <Button variant="contained" component={Link} to='../catalog'>Go Back to Catalog</Button>
        </Container>
    )
}
