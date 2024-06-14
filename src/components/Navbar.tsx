import React, { useState } from 'react';
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
      alert('Log in to create listing');
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <AppBar position="sticky" sx={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', color: 'black' }}>
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
    <AppBar position="sticky" sx={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', color: 'black' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer', color: 'black' }} onClick={handleHomeClick}>
          Vehicle Marketplace
        </Typography>
        {isAuthenticated ? (
          <>
            <Button sx={{ color: 'black' }} onClick={handleSellVehicle}>
              Sell a Vehicle
            </Button>
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
            <Button sx={{ color: 'black' }} onClick={() => router.push('/login')}>
              Login
            </Button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
