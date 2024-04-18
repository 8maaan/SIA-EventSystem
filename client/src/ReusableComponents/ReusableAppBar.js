import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from React Router
import { UserAuth } from '../Context-and-routes/AuthContext';

export default function ReusableAppBar() {
  const { signInWithMicrosoft, logOut, user } = UserAuth();
  const settings = ['Profile', 'Logout'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate(); // Get navigate function from React Router

  const handleSignIn = async () => {
    try {
      const signIn = await signInWithMicrosoft();
      console.log(signIn);
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleSignOut = async () => {
    try {
      const signOut = await logOut();
      console.log(signOut);
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (page) => {
    setAnchorElUser(null);
    switch (page) {
      case 'Logout':
        handleSignOut();
        break;

      case 'Profile':
        navigate('/profile'); // Navigate to UserProfile.js
        break;

      default:
        break;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#8a252c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link} // Use Link for navigation
            to="/"
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
            LOGO HERE
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
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link} // Use Link for navigation
            to="/"
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
            <Button
              component={Link} // Use Link for navigation
              to="/"
              sx={{ my: 2, ml: 2, mr: 2, color: 'white', fontFamily: 'Poppins, sans-serif', display: 'block', fontWeight: '600' }}
            >
              Home
            </Button>
            <Button
              component={Link} // Use Link for navigation
              to="/events"
              sx={{ my: 2, ml: 2, mr: 2, color: 'white', fontFamily: 'Poppins, sans-serif', display: 'block', fontWeight: '600' }}
            >
              Events
            </Button>
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
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
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
