import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { logout } from '../utils/auth';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CreateVehicle from '../components/CreateVehicle';

const Navbar = () => {
  const { user, setUser, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleProfile = () => {
    router.push('/profile');
    handleCloseMenu();
  };

  const handleMyListings = () => {
    router.push('/my-listings');
    handleCloseMenu();
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleSellVehicle = () => {
    if (isAuthenticated) {
      setOpen(true);
    } else {
      router.push('/login');
      alert('Log in to create a listing');
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const buttonStyles = {
    color: '#1b1240',
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
    marginRight: 0,
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'white', 
    },
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      backgroundColor: 'transparent',
      borderColor: '#009fb8',
      transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
    },
    '&::before': {
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      borderBottom: '0 solid',
      borderLeft: '0 solid',
    },
    '&::after': {
      top: 0,
      right: 0,
      width: 0,
      height: 0,
      borderTop: '0 solid',
      borderRight: '0 solid',
    },
    '&:hover::before': {
      width: '100%',
      height: '100%',
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
    },
    '&:hover::after': {
      width: '100%',
      height: '100%',
      borderTopWidth: '2px',
      borderRightWidth: '2px',
    },
    '& span': {
      position: 'relative',
      zIndex: 1,
    },
  };

  const scrolledButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'rgb(239, 239, 239)',
    '&:hover': {
      backgroundColor: 'white',
    },
  };

  if (loading) {
    return (
      <AppBar position="sticky" sx={{ background: 'white', backdropFilter: 'blur(10px)', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer', color: 'black' }} onClick={handleHomeClick}>
            Vehicle Marketplace
          </Typography>
          <CircularProgress color="inherit" size={24} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        background: scrolled ? 'rgb(239, 239, 239)' : 'white', 
        backdropFilter: scrolled ? 'blur(10px)' : 'none', 
        color: 'black',
        boxShadow: 'none', 
        transition: 'background 0.3s, backdrop-filter 0.3s',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer', color: 'black' }} onClick={handleHomeClick}>
          Vehicle Marketplace
        </Typography>
        {pathname !== '/login' && pathname !== '/signup' && (
          <Button sx={scrolled ? scrolledButtonStyles : buttonStyles} onClick={handleSellVehicle}>
            <span>Sell your vehicle</span>
          </Button>
        )}
        {isAuthenticated ? (
          <>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{ color: 'black' }}
            >
              {user?.profilePicture ? (
                <Avatar alt={user.username} src={user.profilePicture} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleMyListings}>My Listings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
              <DialogTitle>Create Vehicle</DialogTitle>
              <DialogContent>
                <CreateVehicle onClose={handleCloseDialog} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          pathname !== '/login' && pathname !== '/signup' && (
            <Button sx={scrolled ? scrolledButtonStyles : buttonStyles} onClick={() => router.push('/login')}>
              <span>Login</span>
            </Button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
