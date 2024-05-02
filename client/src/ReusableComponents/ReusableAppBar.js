import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context-and-routes/AuthContext';
import { db } from "../Firebase/firebaseConfig";



export default function ReusableAppBar() {

  const { signInWithMicrosoft, logOut, user} = UserAuth();
  const [isOrganizer, setIsOrganizer] = useState(
    localStorage.getItem('isOrganizer') !== null
      ? JSON.parse(localStorage.getItem('isOrganizer'))
      : null
  );

  const pages = user ? ['Home', 'Community'] : ['Home', 'Community', 'Sign In'];
  const settings = isOrganizer ? ['Profile', 'Create Event', 'Logout'] : ['Profile', 'Logout'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigateTo = useNavigate();

  const handleSignIn = async () =>{
      try{
          const signIn = await signInWithMicrosoft();
          console.log(signIn);
          handleRegister(signIn.user.uid, signIn.user.email, signIn.user.displayName);
          checkIsOrganizer(signIn.user.email);
          // navigateTo(0);
      }catch(e){
          console.log(e.message);
      }
  }

  const handleSignOut = async () =>{
      try{
          await logOut();
          navigateTo('/');
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
      case 'Create Event':
        navigateTo('/create-event')
        break;
      case 'Logout':
        handleSignOut();
        break;

      default:
        break;
    }
  };

  const navigateToLanding = () =>{
    navigateTo('/');
  }

  const handleRegister = async (uid, email, displayName) => {
    try{
      const docRef = doc(db, 'user', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "user", uid), {
          email: email,
          displayName: displayName,
        });
      }
    }catch(e){
      console.log(e);
    }
  };

  const checkIsOrganizer = async (signedInEmail) =>{
    try {
      const querySnapshot = await getDocs(collection(db, "organizers"));
      const organizers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      const userIsOrganizer = organizers.some((organizer) => organizer.email === signedInEmail);
      
      console.log("userIsOrganizer value: ",userIsOrganizer);
      setIsOrganizer(userIsOrganizer);
      localStorage.setItem('isOrganizer', JSON.stringify(userIsOrganizer));

      console.log("isOrganizer value: ", isOrganizer);

    } catch (error) {
      console.error("Error checking if user is organizer:", error);
    }
  }

  console.log(isOrganizer);
  

  return (
    <AppBar position="static" sx={{backgroundColor: '#8a252c'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="https://cit.edu/"
            onClick={navigateToLanding}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
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
              {user ?
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* AVATAR */}
                  <Avatar src="https://imgur.com/ip7Owg9.png" />
                </IconButton>
                :
                <></>
              }
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