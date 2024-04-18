import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context-and-routes/AuthContext';
import { db } from "../Firebase/firebaseConfig";


export default function ReusableAppBar() {

  const { signInWithMicrosoft, logOut, user} = UserAuth();
  
  const pages = user ? ['Home', 'Community'] : ['Home', 'Community', 'Sign In'];
  const settings = ['Profile', 'Logout'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [loginState, setLoginState] = useState(false);

  const navigateTo = useNavigate();

  const handleSignIn = async () =>{
      try{
          const signIn = await signInWithMicrosoft();
          setLoginState(true);
          navigateTo('/home');
      }catch(e){
          console.log(e.message);
      }
  }

  const handleSignOut = async () =>{
      try{
          const signOut = await logOut();
          console.log(signOut);
          navigateTo('/');
          setLoginState(false);
      }catch (e){
          console.log(e.message);
      }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    switch(page){
      case 'Sign In':
        handleSignIn();
        break;

      case 'Home':
        navigateTo('/home');
        break;

      default:
        break;
    }
  };

  const handleCloseUserMenu = (page) => {
    setAnchorElUser(null);
    switch(page){
      case 'Logout':
        handleSignOut();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if(loginState == true) {
      const users = user;
      const handleRegister = async () => {
        const docRef = doc(db, 'user', users.uid);
        const docSnap = await getDoc(docRef);
    
        if (!docSnap.exists()) {
          await setDoc(doc(db, "user", users.uid), {
            email: users.email,
            displayName: users.displayName
          });
        }
      };
      handleRegister();
    }
},[loginState]);

  return (
    <AppBar position="static" sx={{backgroundColor: '#8a252c'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://cit.edu/"
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
            {/* LOGO */}
            EvntListnr
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* MENU ICON */}
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            Event Hub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleCloseNavMenu(page)}}
                sx={{ my: 2, ml: 2, mr: 2, color: 'white', fontFamily: 'Poppins, sans-serif', display: 'block', fontWeight: '600' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* AVATAR */}
                <Avatar src="https://imgur.com/ip7Owg9.png" />
                
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>{handleCloseUserMenu(setting)}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}