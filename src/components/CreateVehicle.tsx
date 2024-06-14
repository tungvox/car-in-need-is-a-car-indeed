"use client";

import { useState, useEffect } from 'react';
import { TextField, Button, Typography, CircularProgress, Box, InputAdornment, Autocomplete } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createVehicle, getVehicleMakes } from '../utils/api';

const CreateVehicle = ({ onClose }: { onClose: () => void }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [power, setPower] = useState('');
  const [fueltype, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [vehicletype, setVehicleType] = useState('');
  const [bodymodel, setBodyModel] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [vehicleMakes, setVehicleMakes] = useState<{ make: string, models: string[] }[]>([]);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = { make, model, year, mileage, price, power, fueltype, transmission, vehicletype, bodymodel, location, description };
    const newFieldErrors = Object.keys(requiredFields).reduce((acc, key) => {
      acc[key] = !requiredFields[key as keyof typeof requiredFields];
      return acc;
    }, {} as { [key: string]: boolean });

    if (Object.values(newFieldErrors).some((error) => error)) {
      setFieldErrors(newFieldErrors);
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('make', make);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('mileage', mileage);
      formData.append('price', price);
      formData.append('power', power);
      formData.append('fueltype', fueltype);
      formData.append('transmission', transmission);
      formData.append('vehicletype', vehicletype);
      formData.append('bodymodel', bodymodel);
      formData.append('location', location);
      formData.append('description', description);
      images.forEach((image) => formData.append('images', image));

      await createVehicle(formData);
      onClose();
      window.location.reload();
    } catch (error) {
      setError('Failed to create vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    setFieldErrors({ ...fieldErrors, [field]: false });
  };

  return (
    <Box>
      <Autocomplete
        options={vehicleMakes.map((option) => option.make)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Make"
            margin="normal"
            fullWidth
            required
            error={fieldErrors.make}
            helperText={fieldErrors.make && 'Make is required'}
          />
        )}
        value={make}
        onChange={(event, newValue) => {
          setMake(newValue || '');
          setModel('');
          setFieldErrors({ ...fieldErrors, make: false });
        }}
      />
      <Autocomplete
        options={make ? vehicleMakes.find((option) => option.make === make)?.models || [] : []}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Model"
            margin="normal"
            fullWidth
            required
            error={fieldErrors.model}
            helperText={fieldErrors.model && 'Model is required'}
          />
        )}
        value={model}
        onChange={(event, newValue) => {
          setModel(newValue || '');
          setFieldErrors({ ...fieldErrors, model: false });
        }}
        disabled={!make}
      />
      <TextField
        label="Year"
        value={year}
        onChange={handleInputChange(setYear, 'year')}
        fullWidth
        margin="normal"
        type="number"
        required
        error={fieldErrors.year}
        helperText={fieldErrors.year ? 'Year is required and must be between 1886 and the current year' : 'Year must be between 1886 and the current year'}
        inputProps={{ min: 1886, max: new Date().getFullYear() }}
      />
      <TextField
        label="Mileage"
        value={mileage}
        onChange={handleInputChange(setMileage, 'mileage')}
        fullWidth
        margin="normal"
        type="number"
        required
        error={fieldErrors.mileage}
        helperText={fieldErrors.mileage ? 'Mileage is required and must be between 0 and 500,000' : 'Mileage must be between 0 and 500,000'}
        inputProps={{ min: 0, max: 500000 }}
      />
      <TextField
        label="Price"
        value={price}
        onChange={handleInputChange(setPrice, 'price')}
        fullWidth
        margin="normal"
        type="number"
        required
        error={fieldErrors.price}
        helperText={fieldErrors.price ? 'Price is required and must be between 0 and 500,000' : 'Price must be between 0 and 500,000'}
        inputProps={{ min: 0, max: 500000 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <TextField
        label="Power (hp)"
        value={power}
        onChange={handleInputChange(setPower, 'power')}
        fullWidth
        margin="normal"
        type="number"
        required
        error={fieldErrors.power}
        helperText={fieldErrors.power ? 'Power is required and must be between 0 and 1,500' : 'Power must be between 0 and 1,500'}
        inputProps={{ min: 0, max: 1500 }}
      />
      <Autocomplete
        options={['Petrol', 'Diesel', 'Electric', 'Hybrid']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Fuel Type"
            margin="normal"
            fullWidth
            required
            error={fieldErrors.fueltype}
            helperText={fieldErrors.fueltype && 'Fuel Type is required'}
          />
        )}
        value={fueltype}
        onChange={(event, newValue) => {
          setFuelType(newValue || '');
          setFieldErrors({ ...fieldErrors, fueltype: false });
        }}
      />
      <Autocomplete
        options={['Manual', 'Automatic']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Transmission"
            margin="normal"
            fullWidth
            required
            error={fieldErrors.transmission}
            helperText={fieldErrors.transmission && 'Transmission is required'}
          />
        )}
        value={transmission}
        onChange={(event, newValue) => {
          setTransmission(newValue || '');
          setFieldErrors({ ...fieldErrors, transmission: false });
        }}
      />
      <Autocomplete
        options={['Car', 'Truck', 'SUV', 'Convertible']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Vehicle Type"
            margin="normal"
            fullWidth
            required
            error={fieldErrors.vehicletype}
            helperText={fieldErrors.vehicletype && 'Vehicle Type is required'}
          />
        )}
        value={vehicletype}
        onChange={(event, newValue) => {
          setVehicleType(newValue || '');
          setFieldErrors({ ...fieldErrors, vehicletype: false });
        }}
      />
      <Autocomplete
        options={['Sedan', 'Coupe', 'Hatchback', 'SUV']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Body Model"
            margin="normal"
            fullWidth
            required
            error={fieldErrors.bodymodel}
            helperText={fieldErrors.bodymodel && 'Body Model is required'}
          />
        )}
        value={bodymodel}
        onChange={(event, newValue) => {
          setBodyModel(newValue || '');
          setFieldErrors({ ...fieldErrors, bodymodel: false });
        }}
      />
      <TextField
        label="Location"
        value={location}
        onChange={handleInputChange(setLocation, 'location')}
        fullWidth
        margin="normal"
        required
        error={fieldErrors.location}
        helperText={fieldErrors.location && 'Location is required'}
      />
      <TextField
        label="Description"
        value={description}
        onChange={handleInputChange(setDescription, 'description')}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
        error={fieldErrors.description}
        helperText={fieldErrors.description && 'Description is required'}
      />
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        name="images"  
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Images
        </Button>
      </label>
      {images.length > 0 && <Typography>{images.length} image(s) selected</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Create Vehicle'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateVehicle;
