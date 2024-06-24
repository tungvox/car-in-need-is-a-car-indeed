"use client";

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Vehicle } from '../types';
import styles from '../app/Carousel.module.css'; // Adjust the path as needed

interface VehicleCarouselProps {
  vehicles: Vehicle[];
}

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1
  }
};

const VehicleCarousel: React.FC<VehicleCarouselProps> = ({ vehicles }) => {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <Box width="100%" sx={{ maxHeight: '700px', overflow: 'hidden' }}>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        showDots={true}
        arrows={true}
        dotListClass={styles.customDotList} // Applying the custom CSS class
      >
        {vehicles.map((vehicle) => {
          const firstImage = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0].imageurl : '';
          return (
            <Card key={vehicle.id} sx={{ maxHeight: '700px', position: 'relative' }}>
              {firstImage && (
                <CardMedia
                  component="img"
                  sx={{ height: '500px', objectFit: 'cover' }} // Adjust height for image
                  image={`http://127.0.0.1:5000/${firstImage}`} // Adjust this URL if necessary
                  alt={`${vehicle.make} ${vehicle.model}`}
                />
              )}
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  color: 'white', 
                  background: 'rgba(0, 0, 0, 0.5)', 
                  padding: '10px'
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {vehicle.make} {vehicle.model}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {vehicle.year} | {formatNumber(vehicle.mileage)} km | {vehicle.fueltype} | {vehicle.transmission}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', marginTop: '5px' }}>
                  {vehicle.description}
                </Typography>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {formatNumber(vehicle.price)} €
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default VehicleCarousel;
