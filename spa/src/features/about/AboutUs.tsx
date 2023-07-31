import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import agent from '../../app/api/agent'
import { useState } from 'react'
import { Alert, AlertTitle, List, ListItem, ListItemText } from '@mui/material'

export default function AboutUs() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const getValidationErrors = () => {
        agent.Errors.getValidationError()
            .then(() => console.log('will not appear'))
            .catch(error => setValidationErrors(error))
    }
    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h3" gutterBottom color="initial">Errors Testing</Typography>
            <ButtonGroup color="primary" fullWidth>
                <Button variant='contained' onClick={() => agent.Errors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.Errors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.Errors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={getValidationErrors}>Test Validation Error</Button>
                <Button variant='contained' onClick={() => agent.Errors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
            </ButtonGroup>
            {
                validationErrors.length > 0 &&
                <Alert severity='error'>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {
                            validationErrors.map(error => (
                                <ListItem key={error}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </Alert>
            }
        </Container>
    )
}
