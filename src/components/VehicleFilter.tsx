"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Box, Autocomplete, Slider, Typography } from '@mui/material';
import { getVehicleMakes } from '../utils/api';

interface FilterProps {
  onFilter: (filters: any) => void;
}

interface VehicleMake {
  make: string;
  models: string[];
}

const VehicleFilter = ({ onFilter }: FilterProps) => {
  const [make, setMake] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [year, setYear] = useState<string>('');
  const [mileage, setMileage] = useState<[number, number]>([0, 500000]);
  const [price, setPrice] = useState<[number, number]>([0, 500000]);
  const [power, setPower] = useState<[number, number]>([0, 1500]);
  const [fueltype, setFuelType] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [vehicletype, setVehicleType] = useState<string | null>(null);
  const [bodymodel, setBodyModel] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  const commonBoxStyles = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 2,
    marginBottom: 2,
    backgroundColor: '#ffffff'
  };

  const inputContainerStyles = {
    '& .MuiFormControl-root': {
      borderRadius: '5px',
    }
  };

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const makes: VehicleMake[] = await getVehicleMakes();
        const sortedMakes = makes.map((make: VehicleMake) => ({
          ...make,
          models: make.models.sort((a, b) => a.localeCompare(b)),
        })).sort((a, b) => a.make.localeCompare(b.make));
        setVehicleMakes(sortedMakes);
      } catch (error) {
        console.error('Failed to fetch vehicle makes', error);
      }
    };
    fetchVehicleMakes();
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

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
  }, [make, model, year, mileage, price, power, fueltype, transmission, vehicletype, bodymodel, location, hasMounted]);

  const handleSliderChange = (field: string) => (event: Event, newValue: number | number[]) => {
    if (field === 'mileage') setMileage(newValue as [number, number]);
    if (field === 'price') setPrice(newValue as [number, number]);
    if (field === 'power') setPower(newValue as [number, number]);
  };

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]{0,4}$/.test(value)) {
      setYear(value);
    }
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

  return (
    <Box sx={{ padding: '16px', marginTop: '16px', backgroundColor: '#edeff1', borderRadius: '5px', marginLeft: '10px', marginRight: '10px' }}>
      <Box sx={inputContainerStyles}>
        <Autocomplete
          options={vehicleMakes.map(option => option.make)}
          renderInput={params => <TextField {...params} label="Make" margin="normal" fullWidth />}
          value={make}
          onChange={(event, newValue) => {
            setMake(newValue);
            setModel(null); // Reset the model when make changes
          }}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={inputContainerStyles}>
        <Autocomplete
          options={make ? vehicleMakes.find(option => option.make === make)?.models || [] : []}
          renderInput={params => <TextField {...params} label="Model" margin="normal" fullWidth />}
          value={model}
          onChange={(event, newValue) => setModel(newValue)}
          disabled={!make}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={inputContainerStyles}>
        <TextField
          label="Minimum Year"
          type="text"
          value={year}
          onChange={handleYearChange}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Typography gutterBottom>Mileage ({formatNumber(mileage[0])} - {formatNumber(mileage[1])} km)</Typography>
        <Slider
          value={mileage}
          onChange={handleSliderChange('mileage')}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          step={1000}
          sx={{
            width: '100%',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
          }}
          valueLabelFormat={formatNumber}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Typography gutterBottom>Price (€{formatNumber(price[0])} - €{formatNumber(price[1])})</Typography>
        <Slider
          value={price}
          onChange={handleSliderChange('price')}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          step={1000}
          sx={{
            width: '100%',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
          }}
          valueLabelFormat={formatNumber}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Typography gutterBottom>Power ({formatNumber(power[0])} - {formatNumber(power[1])} hp)</Typography>
        <Slider
          value={power}
          onChange={handleSliderChange('power')}
          valueLabelDisplay="auto"
          min={0}
          max={1500}
          step={10}
          sx={{
            width: '100%',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
          }}
          valueLabelFormat={formatNumber}
        />
      </Box>
      <Box sx={inputContainerStyles}>
        <Autocomplete
          options={['Petrol', 'Diesel', 'Electric', 'Hybrid']}
          renderInput={params => <TextField {...params} label="Fuel Type" margin="normal" fullWidth />}
          value={fueltype}
          onChange={(event, newValue) => setFuelType(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={inputContainerStyles}>
        <Autocomplete
          options={['Manual', 'Automatic']}
          renderInput={params => <TextField {...params} label="Transmission" margin="normal" fullWidth />}
          value={transmission}
          onChange={(event, newValue) => setTransmission(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={inputContainerStyles}>
        <Autocomplete
          options={['Car', 'Truck', 'SUV', 'Convertible']}
          renderInput={params => <TextField {...params} label="Vehicle Type" margin="normal" fullWidth />}
          value={vehicletype}
          onChange={(event, newValue) => setVehicleType(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={inputContainerStyles}>
        <Autocomplete
          options={['Sedan', 'Coupe', 'Hatchback', 'SUV']}
          renderInput={params => <TextField {...params} label="Body Model" margin="normal" fullWidth />}
          value={bodymodel}
          onChange={(event, newValue) => setBodyModel(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={inputContainerStyles}>
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
    </Box>
  );
};

export default VehicleFilter;
