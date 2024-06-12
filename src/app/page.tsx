"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import VehicleList from '../components/VehicleList';
import { Vehicle } from '../types';

const Home = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        setVehicles(res.data);
      } catch (error) {
        console.error('Failed to fetch vehicles', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cars For Sell
      </Typography>
      <Grid container spacing={2}>
        <VehicleList vehicles={vehicles} />
      </Grid>
    </Container>
  );
};

export default Home;
