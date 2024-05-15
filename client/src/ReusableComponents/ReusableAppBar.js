import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context-and-routes/AuthContext';
import WildCatsLogo from '../Images/WildCatsLogo.jpg';
import LoginModal from './LoginModal';
import { useUserRoles } from './useUserRoles';

export default function ReusableAppBar() {
  const { logOut, user } = UserAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigateTo = useNavigate();

  const { isOrganizer, isAdmin } = useUserRoles(user ? user.email : null);

  const pages = user ? (!isAdmin ? ['Home', 'Community'] : ['Home', 'Community', 'Applicants']) : ['Home', 'Community', 'Sign In'];
  const settings = isOrganizer ? ['Profile', 'Manage Events', 'Logout'] : ['Profile', 'Logout'];

  const handleModalClose = () => setOpenModal(false);
  const handleSignIn = () => setOpenModal(true);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigateTo('/');
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    switch (page) {
      case 'Sign In':
        handleSignIn();
        break;
      case 'Home':
        navigateTo('/home');
        break;
      case 'Applicants':
        navigateTo('/organizer-applicants');
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (page) => {
    setAnchorElUser(null);
    switch (page) {
      case 'Manage Events':
        navigateTo('/manage-event')
        break;
      case 'Logout':
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const navigateToLanding = () => navigateTo('/');

  return (
    <AppBar position="static" sx={{ backgroundColor: '#8a252c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
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
              <MenuIcon />
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
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
            EvntListnr
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, ml: 2, mr: 2, color: 'white', fontFamily: 'Poppins, sans-serif', display: 'block', fontWeight: '600', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {user ?
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={WildCatsLogo} />
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
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {openModal && (<LoginModal open={openModal} onClose={handleModalClose} />)}
      </Container>
    </AppBar>
  );
}

