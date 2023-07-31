import { AppRegistration, DashboardCustomize, Info, Login, Send, ShoppingCart } from '@mui/icons-material'
import { Avatar, Badge, Box, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../store/configureStore'
import SignedInMenu from './SignedInMenu'
import React from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

const midLinks = [
    { title: 'catalog', path: '/catalog',type:<DashboardCustomize/> },
    { title: 'about', path: '/about' ,type:<Info/>},
    { title: 'contact', path: '/contact' ,type:<Send/>}]
const rightLinks = [
    { title: 'login', path: '/login' ,typeIcon:<Login/>},
    { title: 'register', path: '/register' ,typeIcon:<AppRegistration/>}]
const linkStyle = {
    color: 'grey.300',
    typography: 'h6',
    '&.hover,&.active': {
        color: 'inherit'
    }
}
export default function Header() {


    const {user}=useAppSelector(state=>state.account);
    // const {basket}=useSouqContext();
    const {basket}=useAppSelector(state=>state.basket);


    const itemCounts=basket?.items.reduce((sum,item)=>sum+item.quantity,0);
    // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

     
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const [anchorElUs, setAnchorElUs] = React.useState<null | HTMLElement>(null);

      const open = Boolean(anchorEl);
      const openUs = Boolean(anchorElUs);

      const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClickUs= (event: any) => {
        setAnchorElUs(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleCloseUs = () => {
        setAnchorElUs(null);
      };
    
    return (

        <>
        <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            // component="a"
             component={NavLink}
                    to="/"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SOUQ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
               <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{ 
                vertical: 'top',
                horizontal: 'left',
              }}
              open={open}
              onClose={handleClose}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {midLinks.map(({ title, path,type }) => (
                <MenuItem component={NavLink} to={path} key={path} onClick={handleClose}
                //  onClick={handleCloseNavMenu}
                >
                  <ListItemIcon>
           { type}
          </ListItemIcon>
          <ListItemText>{title}</ListItemText>
          <Typography textAlign="center">
            
          </Typography>
                </MenuItem>
              ))}
              {
                        user&&user.roles?.includes('Admin')&&
                        <MenuItem
                            component={NavLink}
                            to={'../inventory'}
                            
                            sx={linkStyle}
                        >
                            INVENTORY
                        </MenuItem>
                    }


            </Menu>
          


          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> 
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SOUQ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={linkStyle}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    {
                        user&&user.roles?.includes('Admin')&&
                        <ListItem
                            component={NavLink}
                            to={'../inventory'}
                            
                            sx={linkStyle}
                        >
                            INVENTORY
                        </ListItem>
                    }
                </List>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <IconButton component={Link} to='basket' size="large" sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCounts} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
            <Tooltip title="Open settings">
              <IconButton 
              onClick={handleClickUs}
               sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp"  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUs}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openUs}
              onClose={handleCloseUs}
            >
              

              {
                user ?
                (<SignedInMenu/>):
                (
              
              rightLinks.map(({ title, path ,typeIcon})=> (
                <MenuItem component={NavLink} to={path} key={path} onClick={handleCloseUs}
                //  onClick={handleCloseNavMenu}
                >
                   <ListItemIcon>
           { typeIcon}
          </ListItemIcon>
          <ListItemText>{title}</ListItemText>
          <Typography textAlign="center">
            
          </Typography>
                </MenuItem>
              ))
                )
            
            }

            </Menu>

          
                       





          </Box>
        </Toolbar>
      </Container>
    </AppBar> 


        
        {/* <AppBar position="fixed" color="primary" >

            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                    fontWeight="bolder"
                    variant="h5"
                    component={NavLink}
                    to="/"
                    sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                    Souqq
                </Typography>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={linkStyle}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    {
                        user&&user.roles?.includes('Admin')&&
                        <ListItem
                            component={NavLink}
                            to={'../inventory'}
                            
                            sx={linkStyle}
                        >
                            INVENTORY
                        </ListItem>
                    }
                </List>
                <Box display="flex" alignItems="center">
                    <IconButton component={Link} to='basket' size="large" sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCounts} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {
                        user ?
                        (<SignedInMenu/>):
                        (

                            <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={linkStyle}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                        )




                    }

                  
                </Box>
            </Toolbar>
        </AppBar> */}
        </>


    )
}
