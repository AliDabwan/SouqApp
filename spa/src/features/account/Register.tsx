import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { toast } from 'react-toastify';
import { SingInUser } from './accountSlice';
import { useEffect } from 'react';


export default function Login() {
  
    // const [validationErrors, setValidationErrors] = useState([])
    const {register,handleSubmit,setError,formState:{isSubmitting,isValid,errors}}=useForm({
        mode:'all'
    });
    const {user}=useAppSelector(state=>state.account);


    const dispach=useAppDispatch();
    const navigate=useNavigate();


    const handleApiErrors=(errors:string[])=>{
        if(errors){
            errors.forEach(error=>{
                if(error.includes('Password')){
                    setError('password',{message:error});
                }else if (error.includes('Email')){
                    setError('email',{message:error});
                }
                else if (error.includes('Username')){
                    setError('username',{message:error});
                }
            })
        }

    }

    useEffect(() => {
      if(user) navigate('../');
 
    }, [user,navigate])
    


  return (
    // <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} maxWidth="sm">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 13,
            p:3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            {/* <AppRegistration /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
             Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit((data:FieldValues)=>

            agent.Account.register(data)
            .then(async()=>{
                toast.success('Registeration Successful');
                
            await dispach(SingInUser({Username:data.username,Password:data.password}));
            navigate('../');


            })
            
            .catch(error=>handleApiErrors(error))
            )} noValidate sx={{ mt: 1 }}>

                {
    


                }


            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
            <TextField
            
              margin="normal"
            //   required
              fullWidth
              label="Username"
            //   autoComplete="email"
              autoFocus
            //   onChange={handleInputChange}
            //   value={values.username}
            {...register('username',{required:true})}
            error={!!errors.username}
            helperText={errors?.username?.message}
            />
             <TextField
              margin="normal"
            //   required
              fullWidth
              label="Email"
            //   autoComplete="email"
            //   onChange={handleInputChange}
            //   value={values.username}
            {...register('email',{
                required:true,
                pattern:{
                    value:/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                    message:'Not a valid Email Address'
                }
                })}
            error={!!errors.email}
            helperText={errors?.email?.message}
            />
            <TextField
              margin="normal"
            //   required
              fullWidth
            //   name="password"
              label="Password"
              type="password"
                {...register('password',
                        {required:'كلمة المرور مطلوبة',
                            pattern:{
                                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/,
                                message:'Not a valid Password'
                            }
                        
                        }
                    )
                }
              error={!!errors.password}
              helperText={errors?.password?.message}



            //   autoComplete="current-password"
            //   onChange={handleInputChange}
            //   value={values.password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
             {/* {
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
            } */}

            
            <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Typography 
                component={Link}
                to={"../login"}
               sx={{fontWeight:'bold',color:'primary.main',textDecoration:'none'}}
                >
                  {"Already have an account? Sign In"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    // { </ThemeProvider> }
  );
}