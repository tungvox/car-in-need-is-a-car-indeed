"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import VehicleList from '../../components/VehicleList';
import { Vehicle } from '../../types';

const MyListings = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      const fetchMyListings = async () => {
        try {
          const res = await axios.get('/api/my-listings');
          setVehicles(res.data);
        } catch (error) {
          console.error('Failed to fetch my listings', error);
        } finally {
          setLoading(false);
        }
      };

      fetchMyListings();
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Listings
      </Typography>
      <Grid container spacing={2}>
        <VehicleList vehicles={vehicles} />
      </Grid>
    </Container>
  );
};

export default MyListings;
