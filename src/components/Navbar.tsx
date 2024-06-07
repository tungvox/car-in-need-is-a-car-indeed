"use client";

import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { logout } from '../utils/auth';

const Navbar = () => {
  const router = useRouter();
  const { user, setUser, isAuthenticated, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  useEffect(() => {
    console.log('Navbar rendered - isAuthenticated:', isAuthenticated); // Add logging
  }, [isAuthenticated]);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Vehicle Marketplace
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography variant="h6" style={{ marginRight: '1rem' }}>
              {user?.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => router.push('/signup')}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
