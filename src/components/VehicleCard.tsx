"use client";

import { Card, CardContent, Typography } from '@mui/material';
import { Vehicle } from '../types';

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {vehicle.make} {vehicle.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${vehicle.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mileage: {vehicle.mileage} miles
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
