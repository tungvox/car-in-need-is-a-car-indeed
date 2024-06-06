"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid } from "@mui/material";
import Layout from "./layout";
import VehicleList from "../components/VehicleList";
import { Vehicle } from "../types";

const Home = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await axios.get("/api/vehicles");
      setVehicles(res.data);
    };
    fetchVehicles();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <VehicleList vehicles={vehicles} />
      </Grid>
    </Container>
  );
};

export default Home;
