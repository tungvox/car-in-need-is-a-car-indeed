"use client";

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Vehicle } from '../types';

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const firstImage = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0].imageurl : '';

  return (
    <Card>
      {firstImage && (
        <CardMedia
          component="img"
          height="140"
          image={`http://127.0.0.1:5000/${firstImage}`} // Adjust this URL if necessary
          alt={`${vehicle.make} ${vehicle.model}`}
        />
      )}
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
