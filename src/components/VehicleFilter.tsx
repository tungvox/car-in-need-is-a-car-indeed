"use client";

import { useState, useEffect } from 'react';
import { TextField, Box, Autocomplete, Slider, Typography } from '@mui/material';
import { getVehicleMakes } from '../utils/api';

interface FilterProps {
  onFilter: (filters: any) => void;
}

const VehicleFilter = ({ onFilter }: FilterProps) => {
  const [make, setMake] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [year, setYear] = useState<string>('');
  const [mileage, setMileage] = useState<[number, number]>([0, 200000]);
  const [price, setPrice] = useState<[number, number]>([0, 100000]);
  const [power, setPower] = useState<[number, number]>([0, 500]);
  const [fueltype, setFuelType] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [vehicletype, setVehicleType] = useState<string | null>(null);
  const [bodymodel, setBodyModel] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [vehicleMakes, setVehicleMakes] = useState<{ make: string, models: string[] }[]>([]);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const makes = await getVehicleMakes();
        setVehicleMakes(makes);
      } catch (error) {
        console.error('Failed to fetch vehicle makes', error);
      }
    };
    fetchVehicleMakes();
  }, []);

  useEffect(() => {
    const filters = {
      make: make || '',
      model: model || '',
      year: year ? parseInt(year) : null,
      mileage,
      price,
      power,
      fueltype: fueltype || '',
      transmission: transmission || '',
      vehicletype: vehicletype || '',
      bodymodel: bodymodel || '',
      location,
    };
    onFilter(filters);
  }, [make, model, year, mileage, price, power, fueltype, transmission, vehicletype, bodymodel, location]);

  const handleSliderChange = (field: string) => (event: Event, newValue: number | number[]) => {
    if (field === 'mileage') setMileage(newValue as [number, number]);
    if (field === 'price') setPrice(newValue as [number, number]);
    if (field === 'power') setPower(newValue as [number, number]);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]{0,4}$/.test(value)) {
      setYear(value);
    }
  };

  return (
    <Box>
      <Autocomplete
        options={vehicleMakes.map((option) => option.make)}
        renderInput={(params) => <TextField {...params} label="Make" margin="normal" fullWidth />}
        value={make}
        onChange={(event, newValue) => {
          setMake(newValue);
          setModel(null); 
        }}
        isOptionEqualToValue={(option, value) => option === value}
      />
      <Autocomplete
        options={make ? vehicleMakes.find((option) => option.make === make)?.models || [] : []}
        renderInput={(params) => <TextField {...params} label="Model" margin="normal" fullWidth />}
        value={model}
        onChange={(event, newValue) => setModel(newValue)}
        disabled={!make}
        isOptionEqualToValue={(option, value) => option === value}
      />
      <TextField
        label="Minimum Year"
        type="text"
        value={year}
        onChange={handleYearChange}
        fullWidth
        margin="normal"
      />
      <Typography gutterBottom>Mileage ({mileage[0]} - {mileage[1]} km)</Typography>
      <Slider
        value={mileage}
        onChange={handleSliderChange('mileage')}
        valueLabelDisplay="auto"
        min={0}
        max={200000}
        step={1000}
      />
      <Typography gutterBottom>Price (${price[0]} - ${price[1]})</Typography>
      <Slider
        value={price}
        onChange={handleSliderChange('price')}
        valueLabelDisplay="auto"
        min={0}
        max={100000}
        step={1000}
      />
      <Typography gutterBottom>Power ({power[0]} - {power[1]} hp)</Typography>
      <Slider
        value={power}
        onChange={handleSliderChange('power')}
        valueLabelDisplay="auto"
        min={0}
        max={500}
        step={10}
      />
      <Autocomplete
        options={['Petrol', 'Diesel', 'Electric', 'Hybrid']}
        renderInput={(params) => <TextField {...params} label="Fuel Type" margin="normal" fullWidth />}
        value={fueltype}
        onChange={(event, newValue) => setFuelType(newValue)}
        isOptionEqualToValue={(option, value) => option === value}
      />
      <Autocomplete
        options={['Manual', 'Automatic']}
        renderInput={(params) => <TextField {...params} label="Transmission" margin="normal" fullWidth />}
        value={transmission}
        onChange={(event, newValue) => setTransmission(newValue)}
        isOptionEqualToValue={(option, value) => option === value}
      />
      <Autocomplete
        options={['Car', 'Truck', 'SUV', 'Convertible']}
        renderInput={(params) => <TextField {...params} label="Vehicle Type" margin="normal" fullWidth />}
        value={vehicletype}
        onChange={(event, newValue) => setVehicleType(newValue)}
        isOptionEqualToValue={(option, value) => option === value}
      />
      <Autocomplete
        options={['Sedan', 'Coupe', 'Hatchback', 'SUV']}
        renderInput={(params) => <TextField {...params} label="Body Model" margin="normal" fullWidth />}
        value={bodymodel}
        onChange={(event, newValue) => setBodyModel(newValue)}
        isOptionEqualToValue={(option, value) => option === value}
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default VehicleFilter;
