"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Box, Autocomplete, Slider, Typography } from '@mui/material';
import { getVehicleMakes } from '../utils/api';
import { Vehicle } from '../types';

interface FilterProps {
  vehicles: Vehicle[]; // Pass vehicles to filter
  onFilter: (filteredVehicles: Vehicle[]) => void; // Pass filtered vehicles back to Home
}

interface VehicleMake {
  make: string;
  models: string[];
}

const commonBoxStyles = {
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: 1,
  backgroundColor: '#ffffff',
};

const sliderStyles = {
  width: '100%',
  '& .MuiSlider-thumb': {
    width: 10,
    height: 10,
    boxShadow: 'none', // Remove the box shadow
    '&:hover, &.Mui-focusVisible': {
      boxShadow: 'none', // Remove the hover circle
    },
  },
};

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    border: 'none', // Remove border before hovering
  },
  '& .MuiInputBase-input': { fontSize: '0.875rem' }, // Existing style
};

const VehicleFilter = ({ vehicles, onFilter }: FilterProps) => {
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
  const [modelOptions, setModelOptions] = useState<string[]>([]); // Added state for model options
  const [fuelTypeOptions] = useState<string[]>(['Petrol', 'Diesel', 'Electric', 'Hybrid']); // Fuel type options
  const [transmissionOptions] = useState<string[]>(['Manual', 'Automatic']); // Transmission options
  const [vehicleTypeOptions] = useState<string[]>(['Car', 'Truck', 'SUV', 'Convertible']); // Vehicle type options
  const [bodyModelOptions] = useState<string[]>(['Sedan', 'Coupe', 'Hatchback', 'SUV']); // Body model options

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
  }, []);

  useEffect(() => {
    if (make) {
      const selectedMake = vehicleMakes.find(option => option.make === make);
      setModelOptions(selectedMake ? selectedMake.models : []); // Update model options based on selected make
    } else {
      setModelOptions([]); // Clear options if no make is selected
    }
  }, [make, vehicleMakes]); // Dependency on make and vehicleMakes

  const filterVehicles = () => {
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

    const filteredVehicles = vehicles.filter(vehicle => {
      const matchesMake = filters.make ? vehicle.make === filters.make : true;
      const matchesModel = filters.model ? vehicle.model === filters.model : true;
      const matchesYear = filters.year ? vehicle.year === filters.year : true;
      const matchesMileage = vehicle.mileage >= filters.mileage[0] && vehicle.mileage <= filters.mileage[1];
      const matchesPrice = vehicle.price >= filters.price[0] && vehicle.price <= filters.price[1];
      const matchesPower = vehicle.power >= filters.power[0] && vehicle.power <= filters.power[1];
      const matchesFuelType = filters.fueltype ? vehicle.fueltype === filters.fueltype : true;
      const matchesTransmission = filters.transmission ? vehicle.transmission === filters.transmission : true;
      const matchesVehicleType = filters.vehicletype ? vehicle.vehicletype === filters.vehicletype : true;
      const matchesBodyModel = filters.bodymodel ? vehicle.bodymodel === filters.bodymodel : true;
      const matchesLocation = filters.location ? vehicle.location.includes(filters.location) : true;

      return matchesMake && matchesModel && matchesYear && matchesMileage && matchesPrice && matchesPower &&
             matchesFuelType && matchesTransmission && matchesVehicleType && matchesBodyModel && matchesLocation;
    });

    onFilter(filteredVehicles); // Pass the filtered vehicles back to the parent
  };

  useEffect(() => {
    filterVehicles();
  }, [make, model, year, mileage, price, power, fueltype, transmission, vehicletype, bodymodel, location, vehicles]);

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
    <Box sx={{ padding: '16px', backgroundColor: '#18314a', borderRadius: '5px', marginLeft: '10px', marginRight: '10px' }}>
      <Box sx={commonBoxStyles}>
        <Autocomplete
          options={vehicleMakes.map(option => option.make)} // Make options
          renderInput={params => 
            <TextField 
              {...params} 
              label="Make" 
              margin="none" // Remove margin
              fullWidth 
              sx={textFieldStyles} // Apply common styles here
            />
          } 
          value={make}
          onChange={(event, newValue) => {
            setMake(newValue);
            setModel(null); 
          }}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Autocomplete
          options={modelOptions} // Use the new state for model options
          renderInput={params => 
            <TextField 
              {...params} 
              label="Model" 
              margin="none" // Remove margin
              fullWidth 
              sx={textFieldStyles} // Apply common styles here
            />
          } 
          value={model}
          onChange={(event, newValue) => setModel(newValue)}
          disabled={!make}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <TextField
          label="Minimum Year"
          type="text"
          value={year}
          onChange={handleYearChange}
          fullWidth
          margin="none"
          sx={{ '& .MuiOutlinedInput-root': {}, '& .MuiInputBase-input': { fontSize: '0.875rem' } }} // Removed height
          InputProps={{ sx: { '&::placeholder': { fontSize: '0.75rem' } } }} // Smaller placeholder font size
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Typography gutterBottom sx={{ fontSize: '0.875rem' }}>Mileage ({formatNumber(mileage[0])} - {formatNumber(mileage[1])} km)</Typography>
        <Slider
          value={mileage}
          onChange={handleSliderChange('mileage')}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          step={1000}
          sx={sliderStyles} // Apply common styles here
          valueLabelFormat={formatNumber}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Typography gutterBottom sx={{ fontSize: '0.875rem' }}>Price (€{formatNumber(price[0])} - €{formatNumber(price[1])})</Typography> 
        <Slider
          value={price}
          onChange={handleSliderChange('price')}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          step={1000}
          sx={sliderStyles} // Apply common styles here
          valueLabelFormat={formatNumber}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Typography gutterBottom sx={{ fontSize: '0.875rem' }}>Power ({formatNumber(power[0])} - {formatNumber(power[1])} hp)</Typography>
        <Slider
          value={power}
          onChange={handleSliderChange('power')}
          valueLabelDisplay="auto"
          min={0}
          max={1500}
          step={10}
          sx={sliderStyles} // Apply common styles here
          valueLabelFormat={formatNumber}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Autocomplete
          options={fuelTypeOptions} // Fuel type options
          renderInput={params => 
            <TextField 
              {...params} 
              label="Fuel Type" 
              margin="none" // Remove margin
              fullWidth 
              sx={textFieldStyles} // Apply common styles here
            />
          } 
          value={fueltype}
          onChange={(event, newValue) => setFuelType(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Autocomplete
          options={transmissionOptions} // Transmission options
          renderInput={params => 
            <TextField 
              {...params} 
              label="Transmission" 
              margin="none" // Remove margin
              fullWidth 
              sx={textFieldStyles} // Apply common styles here
            />
          } 
          value={transmission}
          onChange={(event, newValue) => setTransmission(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Autocomplete
          options={vehicleTypeOptions} // Vehicle type options
          renderInput={params => 
            <TextField 
              {...params} 
              label="Vehicle Type" 
              margin="none" // Remove margin
              fullWidth 
              sx={textFieldStyles} // Apply common styles here
            />
          } 
          value={vehicletype}
          onChange={(event, newValue) => setVehicleType(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <Autocomplete
          options={bodyModelOptions} // Body model options
          renderInput={params => 
            <TextField 
              {...params} 
              label="Body Model" 
              margin="none" // Remove margin
              fullWidth 
              sx={textFieldStyles} // Apply common styles here
            />
          } 
          value={bodymodel}
          onChange={(event, newValue) => setBodyModel(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>
      <Box sx={commonBoxStyles}>
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="none"
          sx={{ '& .MuiOutlinedInput-root': {}, '& .MuiInputBase-input': { fontSize: '0.875rem' } }} // Removed height
          InputProps={{ sx: { '&::placeholder': { fontSize: '0.75rem' } } }} // Smaller placeholder font size
        />
      </Box>
    </Box>
  );
};

export default VehicleFilter;
