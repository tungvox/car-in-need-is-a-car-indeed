"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../app/layout';
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
    <Layout>
      <h1 className="text-3xl font-bold">{vehicle.make} {vehicle.model}</h1>
      <p>Price: ${vehicle.price}</p>
      <p>Mileage: {vehicle.mileage}</p>
      <p>Location: {vehicle.location}</p>
      <p>Description: {vehicle.description}</p>
    </Layout>
  );
};

export default VehicleDetail;
