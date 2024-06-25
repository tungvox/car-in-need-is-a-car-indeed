"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '../app/Carousel.module.css';
import { Vehicle } from '../types';
import { useInView } from 'react-intersection-observer';

type VehicleCardProps = {
  vehicle: Vehicle;
};

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className={`${styles.carouselArrow} ${styles.customLeftArrow}`} onClick={onClick}>
    ‹
  </button>
);

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className={`${styles.carouselArrow} ${styles.customRightArrow}`} onClick={onClick}>
    ›
  </button>
);

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const images = vehicle.images.map((img) => `http://127.0.0.1:5000/${img.imageurl}`);
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.1, // Trigger when 10% of the card is visible
  });

  const chipStyle = {
    backgroundColor: '#346faa',
    color: 'white',
    borderRadius: '3px',
  };

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const checkIfNew = () => {
      if (!vehicle.dateposted) return false;
      const now = new Date();
      const postedDate = new Date(vehicle.dateposted);
      const diffHours = (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60);
      return diffHours <= 24;
    };

    setIsNew(checkIfNew());
  }, [vehicle.dateposted]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 3,
        transition: 'transform 0.3s ease-in-out, opacity 0.5s ease-in-out',
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        opacity: inView ? 1 : 0,
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        height: '100%', // Ensure card takes up full height
        position: 'relative', // Add this line for relative positioning
      }}
    >
      {isNew && (
        <Chip
          label="New 24h"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'red',
            color: 'white',
            zIndex: 1, // Ensure it is above other elements
          }}
        />
      )}
      <Carousel
        responsive={responsive}
        showDots
        infinite
        arrows
        containerClass={styles.carouselContainer}
        dotListClass={styles.customDotList}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {images.map((url, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <img src={url} alt={`${vehicle.make} ${vehicle.model}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          </Box>
        ))}
      </Carousel>
      <CardContent sx={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {vehicle.make} - {vehicle.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(vehicle.dateposted)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
          {vehicle.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
          <Chip label={vehicle.year.toString()} sx={chipStyle} />
          <Chip label={`${vehicle.mileage.toLocaleString()} km`} sx={chipStyle} />
          <Chip label={vehicle.location} sx={chipStyle} />
          <Chip label={vehicle.transmission} sx={chipStyle} />
          <Chip label={vehicle.fueltype} sx={chipStyle} />
        </Box>
        <Box sx={{ marginTop: 'auto', textAlign: 'right' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#19324b' }}>
            {vehicle.price.toLocaleString()} €
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
