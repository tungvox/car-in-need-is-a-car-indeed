"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import VehicleList from '../../components/VehicleList';
import { Vehicle } from '../../types';
import { CircularProgress, Typography, Box } from '@mui/material';

const MyListings = () => {
  const [listings, setListings] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/my-listings', {
          withCredentials: true,
        });
        setListings(response.data);
      } catch (error: unknown) {
        console.error('Failed to fetch listings:', error);
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (isAuthenticated) {
        fetchListings();
      } else {
        router.push('/login');
      }
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
    <Box>
      <Typography variant="h4" gutterBottom>
        My Vehicles
      </Typography>
      {listings.length > 0 ? (
        <VehicleList vehicles={listings} />
      ) : (
        <Typography variant="body1">No listings found.</Typography>
      )}
    </Box>
  );
};

export default MyListings;
