import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { User } from '../../app/models/user';
import { FieldValues } from 'react-hook-form';
import agent from '../../app/api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { setBasket } from '../basket/basketSlice';

interface AccountState{
    user:User | null



}

const initialState :AccountState= {
    user:null

}

export const SingInUser=createAsyncThunk<User,FieldValues>(
    'account/SingInUser',
    async(data,thunkAPI)=>{
        try {
            const userDto = await agent.Account.login(data);
            const {basket,...user}=userDto;
            if(basket)thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user))
            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data})

        
        }


    }


)

export const fetchCurrentUser=createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async(_,thunkAPI)=>{

        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.Account.currentUser();
            const {basket,...user}=userDto;
            if(basket)thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user))
            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data})

        
        }


    },{
        condition:()=>{
            if(!localStorage.getItem('user'))return false;
        }
    }


)




const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut:(state)=>{
        state.user=null;
        localStorage.removeItem('user');
        history.push('../')
    },
    setUser:(state,action)=>{
        let claims=JSON.parse(atob(action.payload.token.split('.')[1]));
        let roles=claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        state.user={...action.payload,roles:typeof(roles)==='string'?[roles]:roles};
        
    }
  },
  extraReducers:(builder =>{

    builder.addCase(fetchCurrentUser.rejected,(state)=>{

        state.user=null;
        localStorage.removeItem('user');
        toast.error('Session Expired ! please login again');
        history.push('../')


    });
    builder.addMatcher(isAnyOf(SingInUser.fulfilled,fetchCurrentUser.fulfilled),
    (state,action)=>{

        let claims=JSON.parse(atob(action.payload.token.split('.')[1]));
        let roles=claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        state.user={...action.payload,roles:typeof(roles)==='string'?[roles]:roles};
    });
    builder.addMatcher(isAnyOf(SingInUser.rejected),
    (state,action)=>{

        console.log(action.payload) ;
    });

    

  })
  
});

export const {signOut,setUser} = accountSlice.actions

export default accountSlice.reducer