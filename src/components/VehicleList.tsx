"use client";

import VehicleCard from './VehicleCard';
import { Vehicle } from '../types';

type VehicleListProps = {
  vehicles: Vehicle[];
};

const VehicleList = ({ vehicles }: VehicleListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleList;
