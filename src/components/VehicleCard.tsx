"use client";

import { Vehicle } from '../types';

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <div className="border p-4">
      <h2>{vehicle.make} {vehicle.model}</h2>
      <p>Price: ${vehicle.price}</p>
    </div>
  );
};

export default VehicleCard;
