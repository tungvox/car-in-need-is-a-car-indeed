"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import VehicleList from '../components/VehicleList';
import VehicleFilter from '../components/VehicleFilter';
import VehicleCarousel from '../components/VehicleCarousel';
import { Vehicle } from '../types';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        setVehicles(res.data);
        setFilteredVehicles(res.data); // Initialize filtered vehicles
      } catch (error) {
        setError('Failed to fetch vehicles. Please try again.');
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleFilter = (filteredVehicles: Vehicle[]) => {
    setFilteredVehicles(filteredVehicles);
  };

  const newestVehicles = vehicles
    .sort((a, b) => new Date(b.dateposted!).getTime() - new Date(a.dateposted!).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <Container maxWidth={false} sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={false} sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ paddingLeft: '0px !important', paddingRight: '0px !important' }}>
      {/*<VehicleCarousel vehicles={newestVehicles} />*/}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <VehicleFilter vehicles={vehicles} onFilter={handleFilter} /> {/* Pass vehicles to VehicleFilter */}
        </Grid>
        <Grid item xs={12} md={9}>
          <SearchBar vehicles={vehicles} onFilter={handleFilter} />  {/* Pass vehicles to SearchBar */}
          <VehicleList vehicles={filteredVehicles} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
