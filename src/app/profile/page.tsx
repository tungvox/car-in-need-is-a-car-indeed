"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <div>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>Full Name: {user?.fullname}</p>
      </div>
    </Container>
  );
};

export default Profile;
