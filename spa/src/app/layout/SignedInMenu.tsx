import { Button, Menu, Fade, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { signOut } from '../../features/account/accountSlice';
import { clearBasket } from '../../features/basket/basketSlice';
import { Link } from 'react-router-dom';
import { ContentCut } from '@mui/icons-material';

export default function SignedInMenu() {
    const dispatch=useAppDispatch();
    const {user}=useAppSelector(state=>state.account)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button
        color='inherit' 
        sx={{typography:'h6'}}
          onClick={handleClick}
        >
          {user?.email}
        </Button>
        <Menu
        
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
         
          <MenuItem onClick={handleClose}>
          
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to='../orders'>My Orders</MenuItem>
          <MenuItem onClick={()=>
          { 
            dispatch(signOut())
            dispatch(clearBasket())
        
            }
           
            
            }>Logout</MenuItem>
        </Menu>
      </>
    );
}
