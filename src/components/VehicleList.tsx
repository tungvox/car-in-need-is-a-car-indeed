"use client";

import { Grid } from '@mui/material';
import VehicleCard from './VehicleCard';
import { Vehicle } from '../types';

type VehicleListProps = {
  vehicles: Vehicle[];
};

const VehicleList = ({ vehicles }: VehicleListProps) => {
  return (
    <Grid sx={{paddingTop: '16px'}} container spacing={2}>
      {vehicles.map(vehicle => (
        <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VehicleList;
