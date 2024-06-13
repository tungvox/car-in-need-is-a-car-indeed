"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import VehicleList from '../components/VehicleList';
import VehicleFilter from '../components/VehicleFilter';
import { Vehicle } from '../types';

const Home = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        setVehicles(res.data);
        setFilteredVehicles(res.data);
      } catch (error) {
        setError('Failed to fetch vehicles. Please try again.');
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleFilter = (filters: any) => {
    let filtered = vehicles;

    if (filters.make) {
      filtered = filtered.filter(vehicle => vehicle.make.toLowerCase() === filters.make.toLowerCase());
    }
    if (filters.model) {
      filtered = filtered.filter(vehicle => vehicle.model.toLowerCase() === filters.model.toLowerCase());
    }
    if (filters.year) {
      filtered = filtered.filter(vehicle => vehicle.year >= filters.year);
    }
    if (filters.mileage) {
      filtered = filtered.filter(vehicle => vehicle.mileage >= filters.mileage[0] && vehicle.mileage <= filters.mileage[1]);
    }
    if (filters.price) {
      filtered = filtered.filter(vehicle => vehicle.price >= filters.price[0] && vehicle.price <= filters.price[1]);
    }
    if (filters.power) {
      filtered = filtered.filter(vehicle => vehicle.power >= filters.power[0] && vehicle.power <= filters.power[1]);
    }
    if (filters.fueltype) {
      filtered = filtered.filter(vehicle => vehicle.fueltype.toLowerCase() === filters.fueltype.toLowerCase());
    }
    if (filters.transmission) {
      filtered = filtered.filter(vehicle => vehicle.transmission.toLowerCase() === filters.transmission.toLowerCase());
    }
    if (filters.vehicletype) {
      filtered = filtered.filter(vehicle => vehicle.vehicletype.toLowerCase() === filters.vehicletype.toLowerCase());
    }
    if (filters.bodymodel) {
      filtered = filtered.filter(vehicle => vehicle.bodymodel.toLowerCase() === filters.bodymodel.toLowerCase());
    }
    if (filters.location) {
      filtered = filtered.filter(vehicle => vehicle.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredVehicles(filtered);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography color="error">{error}</Typography>
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
        <Grid item xs={12} md={3}>
          <VehicleFilter onFilter={handleFilter} />
        </Grid>
        <Grid item xs={12} md={9}>
          <VehicleList vehicles={filteredVehicles} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
