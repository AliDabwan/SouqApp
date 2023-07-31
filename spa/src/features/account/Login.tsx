import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { SingInUser } from './accountSlice';
import { useEffect } from 'react';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function Login() {
    const {user}=useAppSelector(state=>state.account);

    const dispach=useAppDispatch();
    const navigate=useNavigate();
    const location=useLocation();

    const {register,handleSubmit,formState:{isSubmitting,isValid,errors}}=useForm({
        mode:'all'
    });

    const submitForm=async(data:FieldValues)=>{
        try {
            // await agent.Account.login(data);//.catch(error => console.log(error));

            await dispach(SingInUser(data)).then(data=>{
                if(!(data.meta.requestStatus==='rejected')){

                    navigate(location.state?.from?.pathname||'../');

                }

            });

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      if(user) navigate(location.state?.from?.pathname||'../');

    }, [user,navigate,location.state?.from?.pathname])
    

    // const [values,setValuse]=React.useState({
    //     username:'',
    //     password:''
    // });


//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     agent.Account.login(values);




//     //read data from  controls###
//     // const data = new FormData(event.currentTarget);
//     // console.log({
//     //   email: data.get('email'),
//     //   password: data.get('password'),
//     // });
//   };

//   const handleInputChange=(event:any)=>{
//     const {name,value}=event.target;

//     setValuse({...values,[name]:value});
//   }

  return (
    // <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} maxWidth="sm">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 20,
            p:3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
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
            //   name="password"
              label="Password"
              type="password"
              {...register('password',{required:'كلمة المرور مطلوبة'})}
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
            <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
                to={"../register"}
               sx={{fontWeight:'bold',color:'primary.main',textDecoration:'none'}}
                >
                  {"Don't have an account? Sign Up"}
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