"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { Vehicle } from '../../types';

const VehicleDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (id) {
      const fetchVehicle = async () => {
        const res = await axios.get(`/api/vehicles/${id}`);
        setVehicle(res.data);
      };
      fetchVehicle();
    }
  }, [id]);

  if (!vehicle) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {vehicle.make} {vehicle.model}
      </Typography>
      <Typography variant="body1" component="p">
        Price: ${vehicle.price}
      </Typography>
      <Typography variant="body1" component="p">
        Mileage: {vehicle.mileage}
      </Typography>
      <Typography variant="body1" component="p">
        Location: {vehicle.location}
      </Typography>
      <Typography variant="body1" component="p">
        Description: {vehicle.description}
      </Typography>
    </Container>
  );
};

export default VehicleDetail;
