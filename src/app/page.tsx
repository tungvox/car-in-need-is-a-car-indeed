"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleList from '../components/VehicleList';
import { Vehicle } from '../types';

const Home = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await axios.get('/api/vehicles');
      setVehicles(res.data);
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Vehicle Marketplace</h1>
      <VehicleList vehicles={vehicles} />
    </div>
  );
};

export default Home;
